import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import {usePuterStore} from "~/lib/puter";
import {Link, useNavigate} from "react-router";
import {useEffect, useState} from "react";
import Footer from "~/components/Footer";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Resumind" },
        { name: "description", content: "Smart feedback for your dream job!" },
    ];
}

const FeatureCard = ({ title, description }: {title: string, description: string }) => (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100">
        <h3 className="page-heading text-lg font-bold mb-5">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
);

export default function Home() {
    const { auth, kv } = usePuterStore();
    const navigate = useNavigate();
    const [resumes, setResumes] = useState<Resume[]>([]);
    const [loadingResumes, setLoadingResumes] = useState(false);

    useEffect(() => {
        if(!auth.isAuthenticated) navigate('/auth?next=/');
    }, [auth.isAuthenticated])

    useEffect(() => {
        const loadResumes = async () => {
            setLoadingResumes(true);

            const resumes = (await kv.list('resume:*', true)) as KVItem[];

            const parsedResumes = resumes?.map((resume) => (
                JSON.parse(resume.value) as Resume
            ))

            setResumes(parsedResumes || []);
            setLoadingResumes(false);
        }

        loadResumes()
    }, []);

    const features = [
        {

            title: "AI-Powered Analysis",
            description: "Advanced AI analyzes your resume content, structure, and formatting to provide comprehensive feedback and improvement suggestions."
        },
        {

            title: "ATS Score Rating",
            description: "Get an accurate ATS (Applicant Tracking System) score based on your job description to ensure your resume passes automated filters."
        },
        {

            title: "Smart Matching",
            description: "Compare your resume against specific job descriptions and get tailored recommendations to increase your match rate."
        },
        {

            title: "Instant Feedback",
            description: "Receive detailed analysis within seconds, including keyword optimization, formatting tips, and content suggestions."
        }
    ];

    return <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen">
        <Navbar />

        <section className="main-section">
            <div className="page-heading py-16 mb-[80px] mt-[50px]">
                <h1>Track Your Applications & Resume Ratings</h1>
                {!loadingResumes && resumes?.length === 0 ? (
                    <h2>No resumes found. Upload your first resume to get feedback.</h2>
                ): (
                    <h2>Review your submissions and check AI-powered feedback.</h2>
                )}
            </div>



            {loadingResumes && (
                <div className="flex flex-col items-center justify-center">
                    <img src="/images/resume-scan-2.gif" className="w-[200px]" alt="Loading resumes" />
                </div>
            )}

            {!loadingResumes && resumes.length > 0 && (
                <div className="resumes-section">
                    {resumes.map((resume) => (
                        <ResumeCard key={resume.id} resume={resume} />
                    ))}
                </div>
            )}

            {/* Feature Cards Section - Always visible */}
            {!loadingResumes && (
                <div className="mb-16 mt-16">
                    <div className="text-center mb-8">
                        <h3 className="text-3xl font-bold text-gray-800 mb-2 ">
                            {resumes?.length === 0 ? "Why Choose Resumind?" : "Resumind's Powerful Features"}
                        </h3>
                        <p className="text-gray-600">
                            {resumes?.length === 0
                                ? "Get the competitive edge with AI-powered resume optimization"
                                : "Leverage AI technology to perfect your resume and land your dream job"
                            }
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
                        {features.map((feature, index) => (
                            <FeatureCard key={index} {...feature} />
                        ))}
                    </div>
                </div>
            )}

            {!loadingResumes && resumes?.length === 0 && (
                <div className="flex flex-col items-center justify-center mt-10 gap-6">
                    <div className="text-center">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Ready to Get Started?</h3>
                        <p className="text-gray-600 mb-6">Upload your resume and get instant AI-powered feedback</p>
                    </div>
                    <Link to="/upload" className="primary-button w-fit text-xl font-semibold px-8 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl">
                        Upload Your Resume
                    </Link>
                </div>
            )}
        </section>
        <Footer />
    </main>
}