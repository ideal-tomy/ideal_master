import React from 'react';
import { Heading } from '@chakra-ui/react';

// import { useState } from 'react';
// import { Container, Box, Input, Button, Textarea, FormControl, FormLabel, FormErrorMessage, useToast } from '@chakra-ui/react';
// import { useForm, SubmitHandler } from 'react-hook-form';
// import emailjs from '@emailjs/browser';

// interface IFormInput {
//   name: string;
//   email: string;
//   message: string;
// }

const ContactPage: React.FC = () => {
  // const {
    // register,
    // handleSubmit,
    // formState: { errors, isSubmitting },
    // reset
  // } = useForm<IFormInput>();
  // const toast = useToast();

  // const onSubmit: SubmitHandler<IFormInput> = (data) => {
    // const templateParams = {
      // from_name: data.name,
      // from_email: data.email,
      // message: data.message,
    // };

    // emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_USER_ID')
      // .then((response) => {
         // console.log('SUCCESS!', response.status, response.text);
         // toast({ title: "送信完了", description: "お問い合わせありがとうございます。", status: "success", duration: 5000, isClosable: true });
         // reset();
      // }, (err) => {
         // console.log('FAILED...', err);
         // toast({ title: "送信失敗", description: "エラーが発生しました。時間をおいて再試行してください。", status: "error", duration: 5000, isClosable: true });
      // });
  // };

  return (
    <Heading>Contact Page Test</Heading>
  );
};

export default ContactPage;
