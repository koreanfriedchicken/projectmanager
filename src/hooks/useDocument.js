import { onSnapshot, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

export const useDocument = (collection, id) => {
    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const unsub = onSnapshot(doc(db, collection, id), (doc) => {

            if(doc.data()) {
                setDocument({ ...doc.data(), id: doc.id})
                setError(null)
            } else {
                setError('doc does not exist')
            }

        }, (err) => {
            console.log(err.message)
            setError('failed to get doc')
        })

        return () => unsub()

    }, [collection, id])

    return {document, error}
}