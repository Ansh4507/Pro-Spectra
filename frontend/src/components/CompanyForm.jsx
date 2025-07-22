import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Input, Textarea, Checkbox, Heading } from '@chakra-ui/react';

const CompanyForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    eligibility: '',
    resumeRequired: false,
    topicsToRevise: '',
    jobDescription: '',
    selectionStatus: '',
    interviewExperience: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/companies', formData);
      alert('Company saved!');
      setFormData({
        name: '',
        eligibility: '',
        resumeRequired: false,
        topicsToRevise: '',
        jobDescription: '',
        selectionStatus: '',
        interviewExperience: ''
      });
    } catch (err) {
      console.error('AxiosError:', err);
      alert('Error: Could not save company');
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={5} p={4} borderWidth={1} borderRadius="md">
      <Heading size="md" mb={4}>Add Company</Heading>
      <form onSubmit={handleSubmit}>
        <Input placeholder="Company Name" name="name" value={formData.name} onChange={handleChange} mb={2} />
        <Input placeholder="Eligibility" name="eligibility" value={formData.eligibility} onChange={handleChange} mb={2} />
        <Checkbox name="resumeRequired" isChecked={formData.resumeRequired} onChange={handleChange} mb={2}>
          Resume Required
        </Checkbox>
        <Textarea placeholder="Topics to Revise" name="topicsToRevise" value={formData.topicsToRevise} onChange={handleChange} mb={2} />
        <Textarea placeholder="Job Description" name="jobDescription" value={formData.jobDescription} onChange={handleChange} mb={2} />
        <Input placeholder="Selection Status" name="selectionStatus" value={formData.selectionStatus} onChange={handleChange} mb={2} />
        <Textarea placeholder="Interview Experience" name="interviewExperience" value={formData.interviewExperience} onChange={handleChange} mb={2} />
        <Button type="submit" colorScheme="blue">Submit</Button>
      </form>
    </Box>
  );
};

export default CompanyForm;
//import React, { useState, useEffect } from 'react';
// import {
//     Box,
//     FormControl,
//     FormLabel,
//     Input,
//     Textarea,
//     Select,
//     Button,
//     VStack,
//     Heading,
//     Flex,
//     Text,
//     IconButton,
//     useToast,
// } from '@chakra-ui/react';
// import { CloseIcon } from '@chakra-ui/icons';
// import axios from 'axios';

// function CompanyForm({ company, onCancel }) {
//     const toast = useToast();

//     const [formData, setFormData] = useState({
//         name: '',
//         eligibilityStatus: 'Check Later',
//         eligibilityNotes: '',
//         resumeUploaded: '',
//         topicsToRevise: [],
//         jobDescription: '',
//         selectionStatus: 'Applied',
//         rounds: [],
//     });
//     const [newRoundName, setNewRoundName] = useState('');
//     const [newRoundQuestions, setNewRoundQuestions] = useState('');

//     useEffect(() => {
//         if (company) {
//             setFormData({
//                 name: company.name || '',
//                 eligibilityStatus: company.eligibility?.status || 'Check Later',
//                 eligibilityNotes: company.eligibility?.notes || '',
//                 resumeUploaded: company.resumeUploaded || '',
//                 topicsToRevise: company.topicsToRevise || [],
//                 jobDescription: company.jobDescription || '',
//                 selectionStatus: company.selectionStatus?.status || 'Applied',
//                 rounds: company.selectionStatus?.rounds || [],
//             });
//         }
//     }, [company]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prev) => ({
//             ...prev,
//             [name]: value,
//         }));
//     };

//     const handleTopicsChange = (e) => {
//         setFormData((prev) => ({
//             ...prev,
//             topicsToRevise: e.target.value.split(',').map((topic) => topic.trim()),
//         }));
//     };

//     const addRound = () => {
//         if (newRoundName.trim() !== '') {
//             setFormData((prev) => ({
//                 ...prev,
//                 rounds: [
//                     ...prev.rounds,
//                     {
//                         roundName: newRoundName.trim(),
//                         questionsAsked: newRoundQuestions.split(',').map(q => q.trim()).filter(q => q !== ''),
//                         feedback: '',
//                         date: new Date().toISOString(),
//                     },
//                 ],
//             }));
//             setNewRoundName('');
//             setNewRoundQuestions('');
//         }
//     };

//     const removeRound = (index) => {
//         setFormData((prev) => ({
//             ...prev,
//             rounds: prev.rounds.filter((_, i) => i !== index),
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const payload = {
//             name: formData.name,
//             eligibility: {
//                 status: formData.eligibilityStatus,
//                 notes: formData.eligibilityNotes,
//             },
//             resumeUploaded: formData.resumeUploaded,
//             topicsToRevise: formData.topicsToRevise,
//             jobDescription: formData.jobDescription,
//             selectionStatus: {
//                 status: formData.selectionStatus,
//                 rounds: formData.rounds,
//             },
//         };

//         try {
//             const res = await axios.post("http://localhost:5000/api/companies", payload);
//             toast({
//                 title: 'Company saved!',
//                 status: 'success',
//                 duration: 3000,
//                 isClosable: true,
//             });
//             console.log("Saved:", res.data);
//         } catch (err) {
//             toast({
//                 title: 'Failed to save company.',
//                 status: 'error',
//                 duration: 3000,
//                 isClosable: true,
//             });
//             console.error(err);
//         }
//     };

//     return (
//         <Box p={4} borderWidth="1px" borderRadius="lg" maxWidth="800px" mx="auto" my={4}>
//             <Heading size="md" mb={4}>{company ? 'Edit Company' : 'Add New Company'}</Heading>
//             <form onSubmit={handleSubmit}>
//                 <VStack spacing={3}>
//                     <FormControl isRequired>
//                         <FormLabel>Company Name</FormLabel>
//                         <Input name="name" value={formData.name} onChange={handleChange} />
//                     </FormControl>

//                     <FormControl>
//                         <FormLabel>Eligibility Status</FormLabel>
//                         <Select name="eligibilityStatus" value={formData.eligibilityStatus} onChange={handleChange}>
//                             <option value="Eligible">Eligible</option>
//                             <option value="Not Eligible">Not Eligible</option>
//                             <option value="Check Later">Check Later</option>
//                         </Select>
//                     </FormControl>

//                     <FormControl>
//                         <FormLabel>Eligibility Notes</FormLabel>
//                         <Input name="eligibilityNotes" value={formData.eligibilityNotes} onChange={handleChange} />
//                     </FormControl>

//                     <FormControl>
//                         <FormLabel>Resume Uploaded</FormLabel>
//                         <Input name="resumeUploaded" value={formData.resumeUploaded} onChange={handleChange} />
//                     </FormControl>

//                     <FormControl>
//                         <FormLabel>Topics to Revise</FormLabel>
//                         <Input name="topicsToRevise" value={formData.topicsToRevise.join(', ')} onChange={handleTopicsChange} />
//                     </FormControl>

//                     <FormControl>
//                         <FormLabel>Job Description</FormLabel>
//                         <Textarea name="jobDescription" value={formData.jobDescription} onChange={handleChange} rows={6} />
//                     </FormControl>

//                     <FormControl>
//                         <FormLabel>Selection Status</FormLabel>
//                         <Select name="selectionStatus" value={formData.selectionStatus} onChange={handleChange}>
//                             <option value="Applied">Applied</option>
//                             <option value="Interviewing">Interviewing</option>
//                             <option value="Selected">Selected</option>
//                             <option value="Not Selected">Not Selected</option>
//                             <option value="Rejected">Rejected</option>
//                             <option value="On Hold">On Hold</option>
//                         </Select>
//                     </FormControl>

//                     <Box w="full">
//                         <Heading size="sm" mb={2}>Interview Rounds</Heading>
//                         {formData.rounds.map((round, index) => (
//                             <Flex key={index} p={2} mb={2} borderWidth="1px" borderRadius="md" alignItems="center">
//                                 <Box flex="1">
//                                     <Text fontWeight="bold">{round.roundName}</Text>
//                                     {round.questionsAsked.length > 0 && (
//                                         <Text fontSize="sm">Q: {round.questionsAsked.join(', ')}</Text>
//                                     )}
//                                     <Text fontSize="xs" color="gray.500">Date: {new Date(round.date).toLocaleDateString()}</Text>
//                                 </Box>
//                                 <IconButton
//                                     icon={<CloseIcon />}
//                                     size="sm"
//                                     colorScheme="red"
//                                     onClick={() => removeRound(index)}
//                                     ml={2}
//                                 />
//                             </Flex>
//                         ))}
//                         <Flex mt={2}>
//                             <Input
//                                 placeholder="Round Name (e.g., Technical 1)"
//                                 value={newRoundName}
//                                 onChange={(e) => setNewRoundName(e.target.value)}
//                                 mr={2}
//                             />
//                             <Input
//                                 placeholder="Questions Asked (comma-separated)"
//                                 value={newRoundQuestions}
//                                 onChange={(e) => setNewRoundQuestions(e.target.value)}
//                                 mr={2}
//                             />
//                             <Button onClick={addRound} colorScheme="green">Add Round</Button>
//                         </Flex>
//                     </Box>

//                     <Flex w="full" justifyContent="space-between" mt={4}>
//                         <Button type="submit" colorScheme="blue">
//                             {company ? 'Update Company' : 'Add Company'}
//                         </Button>
//                         {onCancel && (
//                             <Button onClick={onCancel} colorScheme="gray">
//                                 Cancel
//                             </Button>
//                         )}
//                     </Flex>
//                 </VStack>
//             </form>
//         </Box>
//     );
// }

// export default CompanyForm;
