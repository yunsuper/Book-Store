import { useCallback } from "react"

export const useAlert = () =>{
    const showAlert = useCallback((message: string)=>{
        window.alert(message)
    }, []);

    const showConfirm = useCallback((message: string, conConfirm:()=>void)=>{
        if(window.confirm(message)){
            conConfirm();
        }
    }, []);
    
    return { showConfirm, showAlert };
}

