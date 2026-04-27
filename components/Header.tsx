import {GetAboutAPI} from "@/common/api"
import HeaderClient from "@/components/HeaderClient"

export default async function Header() {
    const aboutVO = await GetAboutAPI()
    return <HeaderClient aboutVO={aboutVO}/>
}
