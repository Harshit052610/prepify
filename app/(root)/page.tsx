import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { getInterviewsByUserId, getLatestInterviews } from "@/lib/actions/general.action";
import { redirect } from "next/navigation";

// Type definition for Interview
interface Interview {
    id: string;
    role: string;
    type: string;
    techstack: string[];
    createdAt: string;
}

// Fallback interview data
const DEFAULT_INTERVIEWS: Interview[] = [
    {
        id: "1",
        role: "Front End Interview",
        type: "Mixed",
        techstack: ["React", "CSS", "HTML"],
        createdAt: "Mar 17, 2025",
    },
    {
        id: "2",
        role: "Front End Interview",
        type: "Mixed",
        techstack: ["React", "CSS", "HTML"],
        createdAt: "Mar 17, 2025",
    },
    {
        id: "3",
        role: "Mobile Developer Interview",
        type: "Mixed",
        techstack: ["Flutter", "React Native"],
        createdAt: "Mar 17, 2025",
    },
];

async function Home() {
    const user = await getCurrentUser();
    if (!user) {
        redirect("/login");
    }

    // Both may return Interview[] | null
    const [userInterviewsRaw, allInterviewRaw] = await Promise.all([
        getInterviewsByUserId(user.id),
        getLatestInterviews({ userId: user.id }),
    ]);

    type ApiInterview = Omit<Interview, "techstack"> & { techstack?: string[] | string };

    // Provide safe array fallbacks, always an array
    const safeUserInterviews: ApiInterview[] = Array.isArray(userInterviewsRaw) ? userInterviewsRaw : [];
    const safeAllInterviews: ApiInterview[] = Array.isArray(allInterviewRaw) ? allInterviewRaw : [];

    // Normalize techstack (eliminates implicit any and never issues)
    const normalizeTechstack = (interview: ApiInterview): Interview => ({
        ...interview,
        techstack: Array.isArray(interview.techstack)
            ? interview.techstack
            : typeof interview.techstack === "string"
                ? interview.techstack.split(",").map((str: string) => str.trim())
                : [],
    });

    // Fallback to default interviews if raw data is empty or not present
    const normalizedUserInterviews: Interview[] = safeUserInterviews.length > 0
        ? safeUserInterviews.map(normalizeTechstack)
        : DEFAULT_INTERVIEWS;

    const normalizedAllInterviews: Interview[] = safeAllInterviews.length > 0
        ? safeAllInterviews.map(normalizeTechstack)
        : DEFAULT_INTERVIEWS;

    return (
        <>
            <section className="card-cta">
                <div className="flex flex-col gap-6 max-w-lg">
                    <h2>Ace Interviews with AI Practice & Feedback</h2>
                    <p className="text-lg">
                        Practice real questions with instant feedback
                    </p>
                    <Button asChild className="btn-primary max-sm:w-full">
                        <Link href="/interview">Start an Interview</Link>
                    </Button>
                </div>
                <Image
                    src="/robot2.png"
                    alt="robo-dude"
                    width={400}
                    height={400}
                    className="max-sm:hidden"
                />
            </section>

            <section className="flex flex-col gap-6 mt-8">
                <h2>Your Interviews</h2>
                <div className="interviews-section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                    {normalizedUserInterviews.map((interview) => (
                        <InterviewCard
                            key={interview.id}
                            userId={user.id}
                            interviewId={interview.id}
                            role={interview.role}
                            type={interview.type}
                            techstack={interview.techstack}
                            createdAt={interview.createdAt}
                            className="bg-white shadow-md rounded-xl text-black p-6"
                        />
                    ))}
                </div>
            </section>

            <section className="flex flex-col gap-6 mt-8">
                <h2>Take Interviews</h2>
                <div className="interviews-section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                    {normalizedAllInterviews.map((interview) => (
                        <InterviewCard
                            key={interview.id}
                            userId={user.id}
                            interviewId={interview.id}
                            role={interview.role}
                            type={interview.type}
                            techstack={interview.techstack}
                            createdAt={interview.createdAt}
                            className="bg-white shadow-md rounded-xl text-black p-6"
                        />
                    ))}
                </div>
            </section>
        </>
    );
}

export default Home;
