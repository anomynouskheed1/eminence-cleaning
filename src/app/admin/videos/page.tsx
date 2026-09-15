import Link from "next/link";
import { getAllVideos } from "@/data/videos";

export default async function AdminVideosPage() {
    const videos = await getAllVideos();

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-heading font-bold text-eminence-black">Videos</h1>
                <Link href="/admin/videos/new" className="btn-gold">
                    + Add Video
                </Link>
            </div>

            <div className="bg-white border border-eminence-gold/15">
                {videos.length === 0 && (
                    <p className="p-6 text-sm text-eminence-gray-600">No videos yet.</p>
                )}
                {videos.map((video) => (
                    <Link
                        key={video.id}
                        href={`/admin/videos/${video.id}`}
                        className="flex items-center gap-4 p-4 border-b border-eminence-gold/10 last:border-b-0 hover:bg-eminence-ivory transition-colors"
                    >
                        <div className="w-16 h-16 shrink-0 bg-eminence-black flex items-center justify-center">
                            <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-eminence-black truncate">{video.title}</p>
                            <p className="text-sm text-eminence-gray-600 truncate">{video.category}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}