import { useLoaderData, Link } from "react-router-dom"

export default function Careers() {

  const careersData = useLoaderData()
  // console.log(careersData) logs 2x

  return (
    <div className="careers">
      { careersData.map(career => (
        <Link to={ career.id.toString()} key={career.id}>
          <p>{career.title}</p>
          <p>Based in { career.location }</p>
          </Link>
      ) )}

    </div>
  )
};
// loader function
export const careersDataLoader = async () => {

    const res = await fetch('http://localhost:5000/careers')
    
    if (!res.ok){
      throw Error('Could not fetch the careers')
    }
    return res.json()

}