import style from "../styles/HomePage.module.css"
import Link from "next/link";

export default function Home() {
  return (
    <div className={ style.page }>
      <div className={ style.heading }>SPEED</div>
      <div className={ style.subheading }>SOFTWARE PRACTICE EMPIRICAL EVIDENCE DATABASE</div>
      <Link className={ style.link } href={ "/submit" }>SUBMIT AN ARTICLE </Link>
      <Link className={ style.link } href={ "/search" }>SEARCH DATABASE </Link>
    </div>
  )
}
