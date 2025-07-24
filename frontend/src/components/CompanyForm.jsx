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
  IconButton,
  Text
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

const CompanyForm = () => {
  const formBg = useColorModeValue('glass.light', 'glass.dark');
  const inputBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
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
    const { roundName, roundQuestions } = formData;
    if (roundName.trim() && roundQuestions.trim()) {
      setFormData((prev) => ({
        ...prev,
        rounds: [...prev.rounds, { name: roundName.trim(), questions: roundQuestions.trim() }],
        roundName: '',
        roundQuestions: '',
      }));
    } else {
      toast({
        title: 'Round details missing',
        description: 'Please fill both round name and questions.',
        status: 'warning',
        duration: 2500,
        isClosable: true,
      });
    }
  };

  const handleRoundRemove = (index) => {
    setFormData((prev) => ({
      ...prev,
      rounds: prev.rounds.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    if (!formData.companyName.trim()) {
      toast({
        title: 'Missing Company Name',
        status: 'error',
        duration: 2500,
        isClosable: true,
      });
      return;
    }

    // 🚀 TODO: Connect to backend via POST
    toast({
      title: 'Company Info Saved!',
      description: `${formData.companyName} added successfully.`,
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
      bgGradient="linear(to-br, slate.900, slate.800)"
      display="flex"
      justifyContent="center"
      alignItems="center"
      px={4}
      py={10}
    >
      <Box
        w={['100%', '90%', '520px']}
        bg={formBg}
        border="1px solid"
        borderColor={borderColor}
        boxShadow="xl"
        borderRadius="2xl"
        p={8}
        maxH="95vh"
        overflowY="auto"
        backdropFilter="blur(10px)"
        sx={{ '::-webkit-scrollbar': { width: '4px' } }}
      >
        <Heading size="lg" textAlign="center" mb={6} color="brand.400">
          🚀 Add a Company
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
              placeholder="Select"
              bg={inputBg}
              value={formData.eligibilityStatus}
              onChange={handleChange}
            >
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

          <FormControl display="flex" alignItems="center" gap={4}>
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
              placeholder="e.g., Full-stack role with React & Node"
              bg={inputBg}
              value={formData.description}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Selection Status</FormLabel>
            <Select
              name="selectionStatus"
              placeholder="Select"
              bg={inputBg}
              value={formData.selectionStatus}
              onChange={handleChange}
            >
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Selected">Selected</option>
              <option value="Rejected">Rejected</option>
            </Select>
          </FormControl>

          <Divider mt={6} />

          <Heading size="sm" color="brand.300" mt={4}>Interview Rounds</Heading>
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
            <IconButton
              icon={<AddIcon />}
              aria-label="Add round"
              colorScheme="teal"
              onClick={handleRoundAdd}
            />
          </Flex>

          <Flex gap={2} flexWrap="wrap" maxH="120px" overflowY="auto">
            {formData.rounds.map((round, index) => (
              <Tag size="md" key={index} colorScheme="purple" m={1} borderRadius="lg">
                <TagLabel>{round.name}: {round.questions}</TagLabel>
                <TagCloseButton onClick={() => handleRoundRemove(index)} />
              </Tag>
            ))}
          </Flex>

          <Button
            mt={6}
            w="full"
            colorScheme="brand"
            onClick={handleSubmit}
            size="lg"
            borderRadius="xl"
          >
            Submit Company Info
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default CompanyForm;
