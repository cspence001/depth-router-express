import { useLoaderData, useParams } from "react-router-dom"

export default function CareerDetails() {

    const { id } = useParams() //access id parameter of the current route .
    //returns an object of key/value pairs of the dynamic params from the current URL that were matched by the <Route path>
    //https://reactrouter.com/en/main/hooks/use-params
    const career = useLoaderData()
    // console.log(career) logs 2x

  return (
    <div className="career-details">
        <h2>Career Details for { career.title }</h2>
        <p>Starting salary: {career.salary}</p>
        <p>Location: { career.location }</p>
        <div className="details">
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta sed sunt ipsam quam assumenda quasi ipsa facilis laborum rerum voluptatem!</p>
        </div>
    </div>
  )
};

//loader function
export const careerDetailsLoader = async ({ params }) => {
    const { id } = params
    const res = await fetch (`http://localhost:5000/careers/${id}`)
    if (!res.ok){
      throw Error('Could not find that career')
    }
    return res.json()

}
