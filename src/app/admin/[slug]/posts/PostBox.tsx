import { Post } from '@/app/types/Post'
import { LoadingSpinnerChico } from '@/components/LoadingSpinner'
import { AdvancedImage } from '@cloudinary/react'
import { CloudinaryImage } from '@cloudinary/url-gen'
import { fill } from '@cloudinary/url-gen/actions/resize'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { AiOutlineCalendar } from 'react-icons/ai'

interface PostBoxProps {
    post: Post
    onSelected?: () => void
}
export default function PostBox({ post, onSelected }: PostBoxProps) {
  const [clicked, setClicked] = useState(false)
  const [link, setLink] = useState("")
  const params= useParams()
  if (!params)
    throw Error("useParams() is not working")

  const slug= params.slug

  useEffect(() => {
        
    async function fetchClient() {
      slug ? setLink(`admin/${slug}/posts`) : setLink(`cliente/posts`)
    }
    fetchClient()
  }, [slug]);


  function handleClick() {
    setClicked(true)
    onSelected && onSelected()
    setTimeout(() => {
      setClicked(false)
    }, 1000);
  }

  if (clicked)
    return <LoadingSpinnerChico />
    
  const cldImage = new CloudinaryImage(post.image.split("/").slice(-2).join("/"), {cloudName: 'dtm41dmrz'}).resize(fill().width(155).height(135));

  return (
    <>
      <div className="min-h-[100px]">
          <div onClick={handleClick} className="relative h-full overflow-hidden transition bg-white border border-gray-300 cursor-pointer hover:scale-110">
            {!post.date && <AiOutlineCalendar className="absolute top-0 right-0 text-white" size={23}/>}
            <Link href={`${link}?id=${post.id}`}>
              <AdvancedImage cldImg={cldImage} />
            </Link>
          </div>
      </div>
    </>
    
  )
}
