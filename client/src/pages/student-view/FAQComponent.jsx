import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle, BookOpen, GraduationCap, User } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  
const FAQComponent = () => {
  const faqs = [
    {
      question: "How do I reset my password?",
      answer: "You can reset your password by clicking on the 'Forgot Password' link on the login page and following the instructions.",
      icon: <User className="w-5 h-5 text-blue-500" />,
    },
    {
      question: "How do I view my attendance?",
      answer: "You can view your attendance by navigating to the 'Attendance' section in your student dashboard.",
      icon: <BookOpen className="w-5 h-5 text-green-500" />,
    },
    {
      question: "How do I apply for leave?",
      answer: "You can apply for leave by submitting a leave request through the 'Leave Application' section in the ERP.",
      icon: <GraduationCap className="w-5 h-5 text-purple-500" />,
    },
    {
      question: "Where can I find my exam schedule?",
      answer: "Your exam schedule is available under the 'Exams' section in your student dashboard.",
      icon: <HelpCircle className="w-5 h-5 text-orange-500" />,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 ">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <HelpCircle className="w-6 h-6 text-blue-600" />
            Frequently Asked Questions
          </CardTitle>
          <CardDescription className="text-gray-600 ">
            Find answers to common questions about the Rasiklal M. Dhariwal Institute of Technology College ERP.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="hover:bg-gray-200 bg-gray-50 px-4 py-3 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {faq.icon}
                    <span className="text-left font-medium">{faq.question}</span>
                  </div>
          
                </AccordionTrigger>
                <AccordionContent className="px-4 py-3 text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default FAQComponent;