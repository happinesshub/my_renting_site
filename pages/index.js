import Image from "next/image"
import Link from "next/link"
import Banner from "../comps/Banner"
import Property from "../comps/Property"


import { baseUrl, fetchApi } from "../utils/fetchData"

// GET STATIC PROPS 
export async function getStaticProps() {
  const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002%2C6020&purpose=for-sale&hitsPerPage=25&page=0&lang=en&sort=city-level-score&rentFrequency=monthly&categoryExternalID=4`)
  const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002%2C6020&purpose=for-rent&hitsPerPage=25&page=0&lang=en&sort=city-level-score&rentFrequency=monthly&categoryExternalID=4`)
  
  return {
    props : {
      propertyForSale: propertyForSale?.hits,
      propertyForRent: propertyForRent?.hits,
    }
  }
}

export default function Home({propertyForSale,propertyForRent}) {
console.log(propertyForRent[0])
  return (
    <div className=" flex flex-col items-center  md:mx-20">

      <Banner purpose='RENT A HOME'
        title1='Rental Homes for'
        title2='Everyone'
        desc1=' Explore from Apartments, builder floors, villas'
        desc2='and more'
        buttonText='Explore Renting'
        linkName='/search?purpose=for-rent'
        imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/145426814/33973352624c48628e41f2ec460faba4'
        />

        {/* === PROPERTY MAP */}
        <div className=" grid sm:grid-cols-2 md:grid-cols-3 justify-center gap-8 my-10
        ">
        {propertyForRent.slice(1,7).map((property)=> <Property property={property} key={property.id} />)}
        </div>

      <Banner purpose='BUY A HOME'
        title1=' Find, Buy & Own Your'
        title2='Dream Home'
        desc1=' Explore from Apartments, land, builder floors,'
        desc2=' villas and more'
        buttonText='Explore Buying'
        linkName='/search?purpose=for-sale'
        imageUrl='https://bayut-production.s3.eu-central-1.amazonaws.com/image/110993385/6a070e8e1bae4f7d8c1429bc303d2008'
        />

        {/* === PROPERTY MAP */}
        <div className=" grid sm:grid-cols-2 md:grid-cols-3 justify-center gap-8 my-10
         ">
        {propertyForSale.slice(0,6).map((property)=> <Property property={property} key={property.id} />)}
        </div>

    </div>
  )
}
