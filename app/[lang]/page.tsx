"use client"

import type { Locale } from "../../i18n-config";
import { getDictionary } from "../../i18n-server";


interface PageProps {
    params: { locale: Locale };
  }


  export default  function Lang({params : {locale}} : PageProps) {
        const dictionary = getDictionary(locale)

        
       
        

        return(
            <div>Hi {locale}</div>
        )
        

  }