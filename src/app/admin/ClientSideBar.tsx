"use client"

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillHome, AiFillInstagram, AiFillSetting, AiOutlineHome, AiOutlineInstagram, AiOutlineSetting } from "react-icons/ai";
import { BsHddStack, BsHddStackFill, BsStack } from "react-icons/bs";
import { FaRegUserCircle, FaUserCircle } from "react-icons/fa";
import useClient from "../(client-side)/hooks/useClient";

export default function ClientSideBar() {
  const { slug }= useClient()
  const path= usePathname()

  const commonClasses= "flex gap-2 items-center py-1 mx-2 rounded hover:bg-gray-200"
  const selectedClasses= "font-bold bg-gray-200"

  const dashboardSelected= path.endsWith(slug)
  const dashboard= clsx(commonClasses, dashboardSelected  && selectedClasses)

  const postsSelected= path.endsWith("posts")
  const posts= clsx(commonClasses, postsSelected && selectedClasses)

  const usersSelected= path.endsWith("usuarios")
  const users= clsx(commonClasses, usersSelected && selectedClasses)

  const pilarsSelected= path.endsWith("pilares")
  const pilars= clsx(commonClasses, pilarsSelected && selectedClasses)

  const configSelected= path.endsWith("config")
  const config= clsx(commonClasses, configSelected && selectedClasses)
  
  const pClasses= "hidden sm:block lg:w-36"
  return (
    <>
      <section className="flex flex-col gap-3 py-4 border-r border-r-tinta-vino/50">
        <Link href={`/admin/${slug}`} className={dashboard}>
          {dashboardSelected ? <AiFillHome size={25} /> : <AiOutlineHome size={25}/>}          
          <p className={pClasses}>Dashboard</p>                  
        </Link>

        {divider()}

        <Link href={`/admin/${slug}/posts`} className={posts}>
          {postsSelected ? <AiFillInstagram size={25}/> : <AiOutlineInstagram size={25}/>}          
          <p className={pClasses}>Posts</p>
        </Link>
        <Link href={`/admin/${slug}/usuarios`} className={users}>
          {usersSelected ? <FaUserCircle size={25}/> : <FaRegUserCircle size={25}/>}
          <p className={pClasses}>Usuarios</p>
        </Link>
        <Link href={`/admin/${slug}/pilares`} className={pilars}>
          {pilarsSelected ? <BsHddStackFill size={25}/> : <BsHddStack size={25}/>}
          <p className={pClasses}>Pilares</p>
        </Link>

        {divider()}

        <div className="flex flex-col justify-end flex-grow">
          <Link href={`/admin/${slug}/config`} className={config}>
            {configSelected ? <AiFillSetting size={25}/> : <AiOutlineSetting size={25}/>}
            <p className={pClasses}>Config</p>            
          </Link>
        </div>

      </section>
    </>
  );
}


function divider() {
  return <div className="mx-2 my-5 border-b border-b-tinta-vino/50" />
}