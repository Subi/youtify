import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import {getProviders} from 'next-auth/react'
import Home from '@/components/home/Home'

const inter = Inter({ subsets: ['latin'] })

const LandingPage = ({providers}) => {
  return (
    <Home providers={providers}/>
  )
}


export const getServerSideProps = async () => {
    const providers = await getProviders()
    return {
      props: {
        providers,
      }
    }
}


export default LandingPage;