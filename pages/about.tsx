import { faGithub } from "@fortawesome/free-brands-svg-icons"
import { faLink } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Head from "next/head"
import Link from "next/link"

export default function About() {
  return(<>
    <Head>
      <title>About | SocialReact</title>
    </Head>
    <div>
      <a target={"_blank"} rel='noopener noreferrer' href="https://github.com/deidara047/socialapp-next-firebase" style={{fontSize: "1.4rem"}}><FontAwesomeIcon icon={faGithub} /> Repository on Github</a>
    </div>
    <b>This project does not have a Responsive UI</b>
    <p>In order to get more information about this app, read the README.md file in the GitHub Repository</p>
    <p>A little tutorial about how to use this app:</p>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/hsFe38Lji_Y" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
    </>
  )
}