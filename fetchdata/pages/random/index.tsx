import React,{useState,useEffect} from 'react'

interface RandomPhrase{
    phrase:string
}

const RandomPhrasePage: React.FC = () => {
    const [phrase, setPhrase] = useState<RandomPhrase| null>(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
      const fetchData= async ()=>{
        try {
            const response = await fetch('/api/index')3000
            if (!response.ok){
                throw new Error("Response was not okay");
                
            }
            const result:RandomPhrase= await response.json()
            setData(result)
        } catch (err) {
            setError(err instanceof Error ? err.message:'An error occured')

        }
        finally{
            setLoading(false)
        }
      }    
     fetchData()
    },[]);

if (loading) return <div>Loading ...</div>
if(error) return <div>Error:{error}</div>
    return(
        <div>
            <p>Phrases</p>

            {
                phrase && 
                <div>
                    <h1>{phrase.phrase}</h1>
                </div>
            }
        </div>
    )
}

export default RandomPhrasePage;
    