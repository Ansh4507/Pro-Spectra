import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
  Heading,
  useColorModeValue,
  Flex,
  Switch,
  useToast,
  Divider,
  Tag,
  TagLabel,
  TagCloseButton,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

const CompanyForm = () => {
  const formBg = useColorModeValue('whiteAlpha.900', 'blackAlpha.600');
  const inputBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.300', 'gray.600');
  const toast = useToast();

  const [formData, setFormData] = useState({
    companyName: '',
    eligibilityStatus: '',
    eligibilityNotes: '',
    resumeUploaded: false,
    topics: '',
    description: '',
    selectionStatus: '',
    rounds: [],
    roundName: '',
    roundQuestions: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleRoundAdd = () => {
    if (formData.roundName.trim() && formData.roundQuestions.trim()) {
      setFormData((prev) => ({
        ...prev,
        rounds: [...prev.rounds, {
          name: prev.roundName.trim(),
          questions: prev.roundQuestions.trim()
        }],
        roundName: '',
        roundQuestions: '',
      }));
    }
  };

  const handleRoundRemove = (index) => {
    setFormData((prev) => ({
      ...prev,
      rounds: prev.rounds.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    // Future: Add POST request to backend
    toast({
      title: 'Company Added.',
      description: `${formData.companyName} was successfully added.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    setFormData({
      companyName: '',
      eligibilityStatus: '',
      eligibilityNotes: '',
      resumeUploaded: false,
      topics: '',
      description: '',
      selectionStatus: '',
      rounds: [],
      roundName: '',
      roundQuestions: '',
    });
  };

  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-br, #0f172a, #1e293b)"
      display="flex"
      justifyContent="center"
      alignItems="center"
      px={4}
      py={6}
    >
      <Box
        w={['100%', '90%', '500px']}
        bg={formBg}
        border="1px solid"
        borderColor={borderColor}
        boxShadow="2xl"
        borderRadius="2xl"
        p={6}
        overflowY="auto"
        maxH="95vh"
      >
        <Heading size="lg" textAlign="center" color="teal.400" mb={6}>
          🚀 ProSpectra - Add Company
        </Heading>

        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Company Name</FormLabel>
            <Input
              name="companyName"
              placeholder="e.g., Google"
              bg={inputBg}
              value={formData.companyName}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Eligibility Status</FormLabel>
            <Select
              name="eligibilityStatus"
              bg={inputBg}
              value={formData.eligibilityStatus}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Eligible">Eligible</option>
              <option value="Not Eligible">Not Eligible</option>
              <option value="Check Later">Check Later</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Eligibility Notes</FormLabel>
            <Input
              name="eligibilityNotes"
              placeholder="e.g., CGPA > 7.5"
              bg={inputBg}
              value={formData.eligibilityNotes}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl display="flex" alignItems="center">
            <FormLabel mb="0">Resume Uploaded</FormLabel>
            <Switch
              name="resumeUploaded"
              isChecked={formData.resumeUploaded}
              onChange={handleChange}
              colorScheme="green"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Topics to Revise</FormLabel>
            <Input
              name="topics"
              placeholder="e.g., DSA, OS, DBMS"
              bg={inputBg}
              value={formData.topics}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Job Description</FormLabel>
            <Textarea
              name="description"
              placeholder="e.g., Full-stack Developer role with emphasis on React & Node.js"
              bg={inputBg}
              value={formData.description}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Selection Status</FormLabel>
            <Select
              name="selectionStatus"
              bg={inputBg}
              value={formData.selectionStatus}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Selected">Selected</option>
              <option value="Rejected">Rejected</option>
            </Select>
          </FormControl>

          <Divider />

          <Heading size="sm" mt={4} color="teal.400">Interview Rounds</Heading>
          <Flex gap={2} w="100%" flexWrap="wrap">
            <Input
              name="roundName"
              placeholder="Round Name"
              bg={inputBg}
              value={formData.roundName}
              onChange={handleChange}
              flex="1"
            />
            <Input
              name="roundQuestions"
              placeholder="Questions (comma-separated)"
              bg={inputBg}
              value={formData.roundQuestions}
              onChange={handleChange}
              flex="2"
            />
            <Button onClick={handleRoundAdd} colorScheme="teal" leftIcon={<AddIcon />} minW="100px">
              Add
            </Button>
          </Flex>

          {formData.rounds.map((round, index) => (
            <Tag size="md" key={index} colorScheme="purple" m={1}>
              <TagLabel>{round.name}: {round.questions}</TagLabel>
              <TagCloseButton onClick={() => handleRoundRemove(index)} />
            </Tag>
          ))}

          <Button
            mt={6}
            colorScheme="blue"
            w="full"
            onClick={handleSubmit}
          >
            Submit Company Info
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default CompanyForm;
