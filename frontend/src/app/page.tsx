import style from "../styles/HomePage.module.css"
import { BsArrowRightShort } from "react-icons/bs";
import Link from "next/link";

export default function Home() {
  return (
    <div className={ style.page } style={{position: 'absolute', bottom: '0'}}>
      <div className={ style.heading }>SPEED</div>
      <div className={ style.subheading }>SOFTWARE PRACTICE EMPIRICAL EVIDENCE DATABASE</div>
      <Link className={ style.link } href={ "/submit" }>SUBMIT AN ARTICLE <BsArrowRightShort className={style.arrow}/></Link>
      <Link className={ style.link } href={ "/search" }>SEARCH DATABASE <BsArrowRightShort className={style.arrow}/></Link>
    </div>
  )
}
