import VideoForm from "@/components/admin/VideoForm";

export default function NewVideoPage() {
    return (
        <div>
            <h1 className="text-2xl font-heading font-bold text-eminence-black mb-8">
                Add New Video
            </h1>
            <VideoForm />
        </div>
    );
}