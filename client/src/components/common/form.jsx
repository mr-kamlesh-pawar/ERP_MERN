
import React from "react";
import { Input } from "../ui/input";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
  } from "@/components/ui/select";
  
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Label } from "../ui/label";


const CommonForm = ({ formControls, formData, setFormData, onSubmit, buttonText }) => {

    function renderInputByComponentType (getControlItem)  {
        let element = null;
        const value= formData[getControlItem.name] || '';
        switch(getControlItem.componentType) {
            case 'input':
                element = (<Input
                type={getControlItem.type}
                placeholder={getControlItem.placeholder}
                name={getControlItem.name}
                id={getControlItem.name}
                value={value}
                onChange= {
                    event => setFormData({
                        ...formData,
                        [getControlItem.name] : event.target.value
                    })
                }
                /> );
                break;


            case 'select':
                element = (
                   
                        <Select
                         
                         onValueChange={
                            value => setFormData({
                                ...formData,
                                [getControlItem.name]: value
                            })
                         }
                         value={value}
                         >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder={getControlItem.label}>

                                </SelectValue>

                            </SelectTrigger>

                            <SelectContent>
                                {
                                getControlItem.options &&
                                getControlItem.options.length >0 ? 

                                getControlItem.options.map((optionItem) => <SelectItem key={optionItem.id} 
                                 value={optionItem.id}>
                                    {optionItem.label}
                                 </SelectItem>) : null
                                }
                            </SelectContent>
                        </Select>
                      

                 );
                break;


            case 'textarea':
                element = (<Textarea 
                    name={getControlItem.name}
                    id={getControlItem.name}
                    placeholder={getControlItem.placeholder}
                    value={value}
                    onChange= {
                        event => setFormData({
                            ...formData,
                            [getControlItem.name] : event.target.value
                        })
                    }
                /> );
                break;

            



            default:
                element = (<Input
                type={getControlItem.type}
                placeholder={getControlItem.placeholder}
                name={getControlItem.name}
                id={getControlItem.name}
                value={value}
                onChange= {
                    event => setFormData({
                        ...formData,
                        [getControlItem.name] : event.target.value
                    })
                }
                /> );


    }
    return element;
    }

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {
        formControls.map((controlItem) => (
          <div key={controlItem.name} className="grid w-full gap-1.5">
            <Label className="mb-1"> {controlItem.label}</Label>
            {
                renderInputByComponentType(controlItem)
            }


          </div>
        ))
        
        }
      </div>

      <Button  type="submit"  className="mt-2 w-full">
        {buttonText || 'Submit'}
      </Button>
    </form>
  );
};

export default CommonForm;
