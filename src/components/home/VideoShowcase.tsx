import Link from "next/link";
import { getFeaturedVideos } from "@/data/videos";
import VideoCard from "@/components/work/VideoCard";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export default async function VideoShowcase() {
    const videos = await getFeaturedVideos(3);

    if (videos.length === 0) return null; // nothing to show until real videos are added

    return (
        <section className="py-20 md:py-28 bg-white">
            <div className="eminence-container">
                <RevealOnScroll>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
                        <div>
                            <span className="eminence-label block mb-3">Video Showcase</span>
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-eminence-black max-w-xl">
                                See Us In Action
                            </h2>
                        </div>
                        <Link href="/work" className="btn-secondary shrink-0">
                            View All →
                        </Link>
                    </div>
                </RevealOnScroll>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {videos.map((video, i) => (
                        <RevealOnScroll key={video.id} delay={i * 100}>
                            <VideoCard
                                title={video.title}
                                category={video.category}
                                videoUrl={video.videoUrl}
                                poster={video.poster}
                                caption={video.caption}
                            />
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
}