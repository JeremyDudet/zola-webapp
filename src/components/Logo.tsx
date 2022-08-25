import Link from 'next/link'
import Image from 'next/image'
import { useColorModeValue } from '@chakra-ui/react'
import barzolaBlack from '../../images/barzola-logo-black.png'
import barzolaWhite from '../../images/barzola-logo-white.png'
import styled from '@emotion/styled'

const LogoBox = styled.span`
  align-items: center;
  justify-content: center;
  width: 75px;
  height: 30px;
  display: inline-flex;
  margin-left: 10px;
  maring-top: 7px;
  margin-right: 4px;
  padding-top: 5px;
` 

const Logo = () => {
  return (
    <Link href="/">
      <a>
        <LogoBox>
          <Image 
            src={useColorModeValue(barzolaBlack, barzolaWhite)} 
            alt="BarZola"
          />
        </LogoBox>
      </a>
    </Link>
  )
}

export default Logo
