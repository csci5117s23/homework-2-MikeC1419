import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  return (
    <>
      <Head>
        <title>Mikes ToDo App</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
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
