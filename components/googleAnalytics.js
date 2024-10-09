'use client'
function googleAnalytics() {
  return (
    <div>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}/>
        <script
        dangerouslySetInnerHTML={
            {
          _html:`
                window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}');`,
        }}
        />
      
    </div>
  )
}

export default googleAnalytics
