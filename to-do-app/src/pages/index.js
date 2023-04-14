import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'
import { SignIn } from '@clerk/nextjs'
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [login, setLogin] = useState(false);
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const router = useRouter();
  // if(userId ==null){
  //   return <div>YETTERs YEET</div>
  // }
  if(login){
    return <>
      <div className={styles.signin}>
      <SignIn></SignIn>
      </div>
      <div className={styles.signin}>
      <button className={styles.but} onClick={loginFunc}>Go Back</button>
      </div>
      </>
  }
  if(userId !=null){
    
    router.push("/todos")
  }
  function loginFunc(){
    setLogin(!login);
  }
  
  return (
    <>
      <Head>
        <title>Mikes ToDo App</title>
      </Head>
      <main className={styles.main}>
        

        <div className={styles.center}>
          <div>MIKES TODO APP</div>
        </div>

        <div className={styles.grid}>
        <div className={styles.centersmall}>
            <h2 className={inter.className}>
              Sign In to See Todo List <span>-&gt;</span>
            </h2>
            <button className={styles.but} onClick={loginFunc}>Sign In With Google</button>
            </div>
          
        </div>
      </main>
    </>
  )
}
