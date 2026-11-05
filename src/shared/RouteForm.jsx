import { useEffect, useState } from 'react'
import './SubmitButton.css';

export default function RouteForm(){
    const [submit, setSubmit] = useState(false);

    useEffect(() => {
        console.log('submit теперь:', submit);
    }, [submit]);


    const handlerSubmit = e =>{
        e.preventDefault();
        setSubmit(true);
    }

    return (
        <div>
            <form className="submit-form" onSubmit={handlerSubmit}>
                <input type="submit" value="Отправить"/>
            </form>
        </div>
    )
}
