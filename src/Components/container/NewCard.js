import React from 'react'


const NewCard = (props) => {
    const isTrue = props.title;

    if(isTrue){
        return (
            <>
         
                <table className=' table-auto bg-red-100 rounded-xl  my-5 w-full transition ease-in-out hover:-translate-y-1 hover:scale-110  ' >
                    <tbody>
                        <tr>
                            <td>
                                <img className=' mx-1 my-1 w-20 rounded-xl bg-white object-fill' src={props.image} alt="image" />
                            </td>
                            <td >
                                <h2 className='font-bold'>{props.title}</h2>
                                <p>{props.variant? props.variant: "Original"}</p>
                                <p className='text-red-600'>Delivery in {props.deltime} Days</p>
                            </td>
                            <td>
                                <div className=' text-lime-600 '> &#8377; {props.price}</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </>
    
        )
    }
   
}

export default NewCard
