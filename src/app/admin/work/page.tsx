import Link from "next/link";
import Image from "next/image";
import { getAllWorkItems } from "@/data/work";

export default async function AdminWorkPage() {
    const workItems = await getAllWorkItems();

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-heading font-bold text-eminence-black">Our Work</h1>
                <Link href="/admin/work/new" className="btn-primary bg-eminence-green hover:bg-eminence-green-dark">
                    + Add Project
                </Link>
            </div>

            <div className="bg-white border border-eminence-gray-200">
                {workItems.map((item) => (
                    <Link
                        key={item.id}
                        href={`/admin/work/${item.id}`}
                        className="flex items-center gap-4 p-4 border-b border-eminence-gray-200 last:border-b-0 hover:bg-eminence-gray-50 transition-colors"
                    >
                        <div className="relative w-16 h-16 shrink-0 bg-eminence-gray-100 overflow-hidden">
                            <Image src={item.coverImage} alt={item.title} fill className="object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-eminence-black truncate">{item.title}</p>
                            <p className="text-sm text-eminence-gray-600 truncate">{item.category}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}