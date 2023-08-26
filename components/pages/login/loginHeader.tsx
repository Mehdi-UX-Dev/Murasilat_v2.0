import Image from 'next/image'
import React from 'react'
import KabulUni from "img/KabulUni.png";
import DSIC from "img/DSIC.png";
import Morasilat from "img/Morasilat.png";

const Header = () => {
  return (
      <header className="flex justify-between items-center mx-8 mt-4">
        <div>
          <Image src={Morasilat} alt="Morasilat" height={96} width={96} />
        </div>
        <div className="flex items-center  space-x-12">
          <Image src={KabulUni} alt="Kabul University" height={48} width={48} />
          <Image
            src={DSIC}
            alt="DSIC"
            height={800}
            width={200}
            className="mb-3"
          />
        </div>
      </header>
  )
}

export default Header