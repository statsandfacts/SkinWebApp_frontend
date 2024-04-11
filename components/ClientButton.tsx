'use client'
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
interface Props {
    title: string,
    className?: string,
    disabled?: boolean
    path: string,
    routeType?: 'push' | 'replace'
}

const ClientButton = ({ title, routeType, path, className }: Props) => {
    const router = useRouter()
    const handleClick = () => {
        if (routeType) {
            router[routeType](path)
        } else {
            router.push(path)
        }
    }

    return (
        <Button onClick={handleClick} className={className}>
            {title}
        </Button>
    )
}
export default ClientButton;