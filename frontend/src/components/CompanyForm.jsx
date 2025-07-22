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
  useColorMode,
  useColorModeValue,
  IconButton,
  Flex,
  Switch,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const CompanyForm = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const formBg = useColorModeValue('whiteAlpha.900', 'blackAlpha.600');
  const inputBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.300', 'gray.600');

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
    if (formData.roundName && formData.roundQuestions) {
      setFormData((prev) => ({
        ...prev,
        rounds: [...prev.rounds, { name: prev.roundName, questions: prev.roundQuestions }],
        roundName: '',
        roundQuestions: '',
      }));
    }
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
        boxShadow="xl"
        borderRadius="xl"
        p={6}
        overflowY="auto"
        maxH="95vh"
      >
        <Flex justify="space-between" align="center" mb={4}>
          <Heading size="md" color="teal.400">🚀 ProSpectra</Heading>
          <IconButton
            size="sm"
            onClick={toggleColorMode}
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            aria-label="Toggle mode"
            variant="ghost"
            colorScheme="teal"
          />
        </Flex>

        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Company Name</FormLabel>
            <Input
              name="companyName"
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
              bg={inputBg}
              value={formData.eligibilityNotes}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl display="flex" alignItems="center">
            <FormLabel mb="0">Resume Uploaded (Yes/No)</FormLabel>
            <Switch
              name="resumeUploaded"
              isChecked={formData.resumeUploaded}
              onChange={handleChange}
              colorScheme="green"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Topics to Revise (comma-separated)</FormLabel>
            <Input
              name="topics"
              bg={inputBg}
              value={formData.topics}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Job Description</FormLabel>
            <Textarea
              name="description"
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

          <Heading size="sm" mt={4}>Interview Rounds</Heading>
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
            <Button onClick={handleRoundAdd} colorScheme="teal" minW="80px">
              Add
            </Button>
          </Flex>

          <Button mt={4} colorScheme="blue" w="full">
            Add Company
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default CompanyForm;
