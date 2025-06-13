"use client"

import { getSymptomFaqs } from '@/services/api.symptombot.service'
import { Accordion, AccordionItem } from '@heroui/accordion'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const SymptomBotFaqSection = (symptomId: any) => {
    const router = useRouter();
    const [faqData, setFaqData] = useState<any[]>();
    const [loading, setLoading] = useState<boolean>(false);
    console.log(symptomId.symptomId);
    useEffect(() => {
        getFaqData();
    }, [symptomId])
    const getFaqData = async() => {
        try{
            setLoading(true);
            const response = await getSymptomFaqs(symptomId.symptomId);
            console.log(response);
            setFaqData(response.data.faqs);
        }catch(err){
            toast.error("Something went wrong! Please try again");
        }finally{
            setLoading(false);
        }
    }

    if(loading){
        return(
            <div className='flex justify-center items-center'>
                <Loader2 />
            </div>
        )
    }

  return (
    <div className="sm:p-10 md:px-40">
        <button
        onClick={() => router.back()}
        className="text-blue-600 hover:underline mb-4 flex items-center"
      >
        ← Back
      </button>

      <h2 className="font-bold text-2xl">{"FAQ's"}</h2>
        {faqData && <Accordion
          variant="shadow"
          defaultExpandedKeys={["0"]}
          className="animate-slide-up shadow-none"
        >
          {faqData.map((faq: any, index: number) => (
            <AccordionItem key={index} aria-label={faq?.question} title={faq?.question}>
              <p className="text-slate-500 "> {faq?.answer} </p>
            </AccordionItem>
          ))}
        </Accordion>}
      </div>
  )
}

export default SymptomBotFaqSection