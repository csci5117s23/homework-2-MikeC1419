import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const API_ENDPOINT = "https://backend-q6v7.api.codehooks.io/dev/flashCard/";
  const API_KEY = "a000c16e-5ea8-4400-a25e-8a15f826ccb7";

  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(API_ENDPOINT, {
        'method':'GET',
        'headers': {'x-apikey': API_KEY}
      })
      const data = await response.json()
      // update state -- configured earlier.
      setPosts(data);
      setLoading(false);
    }
    fetchData();
  }, [])
  if(loading){
    return (<span>loading...</span>)
  }
  return (
    <>
      <Head>
        <title>Mikes ToDo App</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
          {posts[0].createdOn}
          </p>
        </div>

        <div className={styles.center}>
          <div>MIKES TODO APP</div>
        </div>

        <div className={styles.grid}>
        <div className={styles.centersmall}>
            <h2 className={inter.className}>
              Sign In to See Todo List <span>-&gt;</span>
            </h2>
            
            <button className={styles.but}>Sign In With Google</button>
            </div>
          
        </div>
      </main>
    </>
  )
}
