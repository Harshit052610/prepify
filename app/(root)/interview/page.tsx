import { redirect } from "next/navigation";
import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";

const Page = async () => {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/login");
    }

    // Replace with actual interviewId or get from somewhere
    const interviewId = "your-interview-id";

    return (
        <>
            <Agent
                userName={typeof user.name === "string" ? user.name : ""}
                userId={user.id}
                profileImage={typeof user.profileURL === "string" ? user.profileURL : undefined}
                type="generate"
                interviewId={interviewId}
            />
        </>
    );
};

export default Page;
