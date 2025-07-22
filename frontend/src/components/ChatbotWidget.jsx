import React, { useState } from 'react';
import {
    Box,
    Input,
    Button,
    VStack,
    Text,
    Flex,
    Heading,
    Divider,
    IconButton,
} from '@chakra-ui/react';
import { ChatIcon, CloseIcon } from '@chakra-ui/icons';

function ChatbotWidget({ companies }) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Hi! Ask me about your companies. Try "list all companies" or "companies I\'m interviewing with".' },
    ]);
    const [input, setInput] = useState('');

    const handleSendMessage = () => {
        if (input.trim() === '') return;

        const userMessage = { sender: 'user', text: input.trim() };
        setMessages((prev) => [...prev, userMessage]);
        processUserMessage(input.trim().toLowerCase());
        setInput('');
    };

    const processUserMessage = (query) => {
        let botResponse = { sender: 'bot', text: "I'm not sure how to answer that. Try rephrasing or asking for specific company details." };

        if (query.includes('list all companies') || query.includes('all companies')) {
            if (companies.length === 0) {
                botResponse.text = "You haven't added any companies yet!";
            } else {
                botResponse.text = "Here are all your tracked companies:\n" + companies.map(c => `- ${c.name} (${c.selectionStatus?.status || 'Unknown'})`).join('\n');
            }
        } else if (query.includes('companies selected') || query.includes('who selected me')) {
            const selected = companies.filter(c => c.selectionStatus?.status === 'Selected');
            if (selected.length === 0) {
                botResponse.text = "No companies have selected you yet. Keep trying!";
            } else {
                botResponse.text = "Congratulations! You've been selected by:\n" + selected.map(c => `- ${c.name}`).join('\n');
            }
        } else if (query.includes('companies interviewing') || query.includes('interview with')) {
            const interviewing = companies.filter(c => c.selectionStatus?.status === 'Interviewing');
            if (interviewing.length === 0) {
                botResponse.text = "You currently have no active interviews.";
            } else {
                botResponse.text = "You are currently interviewing with:\n" + interviewing.map(c => `- ${c.name}`).join('\n');
            }
        } else if (query.includes('companies rejected') || query.includes('who rejected me')) {
            const rejected = companies.filter(c => c.selectionStatus?.status === 'Rejected' || c.selectionStatus?.status === 'Not Selected');
            if (rejected.length === 0) {
                botResponse.text = "No rejections recorded. Good for you!";
            } else {
                botResponse.text = "Companies you were not selected by:\n" + rejected.map(c => `- ${c.name}`).join('\n');
            }
        } else if (query.includes('topics to revise')) {
            const allTopics = new Set();
            companies.forEach(company => {
                company.topicsToRevise.forEach(topic => allTopics.add(topic));
            });
            if (allTopics.size === 0) {
                botResponse.text = "You haven't listed any topics to revise for any company yet.";
            } else {
                botResponse.text = "Here are all the topics you need to revise:\n" + Array.from(allTopics).map(t => `- ${t}`).join('\n');
            }
        } else if (query.startsWith('tell me about')) {
            const companyName = query.replace('tell me about', '').trim();
            const company = companies.find(c => c.name.toLowerCase().includes(companyName));
            if (company) {
                botResponse.text = `**${company.name}**\n` +
                                   `Status: ${company.selectionStatus?.status}\n` +
                                   `Eligibility: ${company.eligibility?.status} (${company.eligibility?.notes || 'N/A'})\n` +
                                   `Resume: ${company.resumeUploaded || 'N/A'}\n` +
                                   `Topics: ${company.topicsToRevise?.join(', ') || 'N/A'}\n` +
                                   `JD: ${company.jobDescription ? (company.jobDescription.length > 100 ? company.jobDescription.substring(0, 100) + '...' : company.jobDescription) : 'N/A'}\n` +
                                   `Rounds: ${company.selectionStatus?.rounds?.map(r => r.roundName).join(', ') || 'N/A'}`;
            } else {
                botResponse.text = `Could not find details for "${companyName}".`;
            }
        } else if (query.includes('hello') || query.includes('hi')) {
            botResponse.text = 'Hello! How can I assist you with your company tracking today?';
        }


        setMessages((prev) => [...prev, botResponse]);
    };


    return (
        <Box
            position="fixed"
            bottom="20px"
            right="20px"
            zIndex="1000"
        >
            {!isOpen ? (
                <IconButton
                    icon={<ChatIcon />}
                    colorScheme="blue"
                    size="lg"
                    borderRadius="full"
                    shadow="lg"
                    onClick={() => setIsOpen(true)}
                />
            ) : (
                <Box
                    borderWidth="1px"
                    borderRadius="lg"
                    shadow="lg"
                    bg="white"
                    width={{ base: "90vw", md: "350px" }}
                    height="450px"
                    display="flex"
                    flexDirection="column"
                >
                    <Flex p={3} borderBottomWidth="1px" alignItems="center">
                        <Heading size="md" flex="1">ProSpectra Chatbot</Heading>
                        <IconButton
                            icon={<CloseIcon />}
                            size="sm"
                            onClick={() => setIsOpen(false)}
                        />
                    </Flex>
                    <VStack
                        flex="1"
                        p={3}
                        overflowY="auto"
                        spacing={3}
                        align="stretch"
                    >
                        {messages.map((msg, index) => (
                            <Flex
                                key={index}
                                justifyContent={msg.sender === 'user' ? 'flex-end' : 'flex-start'}
                            >
                                <Box
                                    bg={msg.sender === 'user' ? 'blue.500' : 'gray.100'}
                                    color={msg.sender === 'user' ? 'white' : 'black'}
                                    p={2}
                                    borderRadius="md"
                                    maxWidth="80%"
                                >
                                    <Text whiteSpace="pre-wrap">{msg.text}</Text>
                                </Box>
                            </Flex>
                        ))}
                    </VStack>
                    <Divider />
                    <Flex p={3}>
                        <Input
                            placeholder="Type your message..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') handleSendMessage();
                            }}
                            flex="1"
                            mr={2}
                        />
                        <Button onClick={handleSendMessage} colorScheme="blue">Send</Button>
                    </Flex>
                </Box>
            )}
        </Box>
    );
}

export default ChatbotWidget;