"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import { interviewer } from "@/constants";
import { createFeedback } from "@/lib/actions/general.action";

enum CallStatus {
    INACTIVE = "INACTIVE",
    CONNECTING = "CONNECTING",
    ACTIVE = "ACTIVE",
    FINISHED = "FINISHED",
}

interface SavedMessage {
    role: "user" | "system" | "assistant";
    content: string;
}

interface AgentProps {
    userName: string;
    userId: string;
    interviewId: string;
    feedbackId?: string;
    type: string;
    questions?: string[];
    profileImage?: string;
}

interface WordItem {
    id: string;
    word: string;
}

const Agent = ({
                   userName,
                   userId,
                   interviewId,
                   feedbackId,
                   type,
                   questions,
                   profileImage,
               }: AgentProps) => {
    const router = useRouter();
    const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
    const [messages, setMessages] = useState<SavedMessage[]>([]);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [words, setWords] = useState<WordItem[]>([]);

    useEffect(() => {
        const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
        const onCallEnd = () => setCallStatus(CallStatus.FINISHED);

        const onMessage = (message: any) => {
            if (message.type === "transcript" && message.transcriptType === "final") {
                const newMessage = { role: message.role, content: message.transcript };
                setMessages((prev) => [...prev, newMessage]);
            }
        };

        const onSpeechStart = () => setIsSpeaking(true);
        const onSpeechEnd = () => setIsSpeaking(false);
        const onError = (error: Error) => {
            console.log("Error:", error);
        };

        vapi.on("call-start", onCallStart);
        vapi.on("call-end", onCallEnd);
        vapi.on("message", onMessage);
        vapi.on("speech-start", onSpeechStart);
        vapi.on("speech-end", onSpeechEnd);
        vapi.on("error", onError);

        return () => {
            vapi.off("call-start", onCallStart);
            vapi.off("call-end", onCallEnd);
            vapi.off("message", onMessage);
            vapi.off("speech-start", onSpeechStart);
            vapi.off("speech-end", onSpeechEnd);
            vapi.off("error", onError);
        };
    }, []);

    // Add new words and set timer to remove each
    useEffect(() => {
        if (messages.length > 0) {
            const newWords = messages[messages.length - 1].content.trim().split(/\s+/);
            newWords.forEach(word => {
                const id = `${word}-${Date.now()}-${Math.random()}`;
                setWords(prev => [...prev, { id, word }]);
                setTimeout(() => {
                    setWords(prev => prev.filter(w => w.id !== id));
                }, 2000); // vanish after 2 seconds
            });
        }
    }, [messages]);

    // Clear words on call end
    useEffect(() => {
        if (callStatus === CallStatus.FINISHED || callStatus === CallStatus.INACTIVE) {
            setWords([]);
        }
    }, [callStatus]);

    useEffect(() => {
        const handleGenerateFeedback = async (messages: SavedMessage[]) => {
            if (!interviewId || !userId) {
                alert("Interview ID or User ID missing.");
                router.push("/");
                return;
            }
            const { success, feedbackId: fbId } = await createFeedback({
                interviewId,
                userId,
                transcript: messages,
                feedbackId,
            });
            if (success && fbId) {
                router.push(`/interview/${interviewId}/feedback`);
            } else {
                alert("Failed to save feedback. Redirecting to home.");
                router.push("/");
            }
        };

        if (callStatus === CallStatus.FINISHED) {
            handleGenerateFeedback(messages);
        }
    }, [callStatus, messages, interviewId, userId, feedbackId, router, type]);

    const handleCall = async () => {
        setCallStatus(CallStatus.CONNECTING);
        if (type === "generate") {
            await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
                variableValues: { username: userName, userid: userId },
            });
        } else {
            let formattedQuestions = "";
            if (questions && Array.isArray(questions)) {
                formattedQuestions = questions.map((question) => `- ${question}`).join("\n");
            }
            await vapi.start(interviewer, { variableValues: { questions: formattedQuestions } });
        }
    };

    const handleDisconnect = () => {
        vapi.stop();
    };

    const showTranscript = callStatus === CallStatus.CONNECTING || callStatus === CallStatus.ACTIVE;

    return (
        <>
            <div className="call-view">
                {/* AI Interviewer Card */}
                <div className="card-interviewer">
                    <div className="avatar">
                        <Image
                            src="/avatarai2.png"
                            alt="profile-image"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-full"
                        />
                        {isSpeaking && <span className="animate-speak" />}
                    </div>
                    <h3 className="text-white">Prepify AI</h3>
                </div>
                {/* User Profile Card */}
                <div className="card-border">
                    <div className="card-content">
                        <Image
                            src={profileImage ?? "/img.png"}
                            alt="profile-image"
                            width={120}
                            height={120}
                            className="rounded-full object-cover size-[120px]"
                        />
                        <h3 className="text-white">{userName}</h3>
                    </div>
                </div>
            </div>
            {/* Transcript block, words appear then vanish after 2s */}
            {showTranscript && (
                <div className="transcript-border">
                    <div className="transcript" style={{ minHeight: "3rem" }}>
            <span>
              {words.map(({ word, id }) => (
                  <span key={id} className="single-word">{word} </span>
              ))}
            </span>
                    </div>
                </div>
            )}
            <div className="w-full flex justify-center">
                {callStatus !== CallStatus.ACTIVE ? (
                    <button className="relative btn-call" onClick={handleCall}>
            <span
                className={cn(
                    "absolute animate-ping rounded-full opacity-75",
                    callStatus !== CallStatus.CONNECTING && "hidden"
                )}
            />
                        <span className="relative">
              {callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED
                  ? "Call"
                  : ". . ."}
            </span>
                    </button>
                ) : (
                    <button className="btn-disconnect" onClick={handleDisconnect}>
                        End
                    </button>
                )}
            </div>
        </>
    );
};

export default Agent;
