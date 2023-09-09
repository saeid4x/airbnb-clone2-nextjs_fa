"use client"

import { useRouter } from "next/navigation";
import Button from "./Button";
import Heading from "./Heading";

interface EmptyState {
    title?: string;
    subtitle?: string;
    showReset?: boolean
}

const EmptyState:React.FC<EmptyState> = ({
    title="چیزی پیدا نشد",subtitle="بعضی فیلترها را حذف یا تغییر دهید",
    showReset
}) => {

    const router = useRouter();

    return ( 
        <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
            <Heading
               title={title}
               subtitle={subtitle}
               center
            />

            <div className="w-48 mt-4">
                {showReset && (
                    <Button
                      outline 
                      label="حذف تمام فیلترها"
                      onClick={() => router.push('/')}
                    />
                )}
            </div>
        </div>
     );
}
 
export default EmptyState;