import { Body, Button, Container, Head, Html, Preview, Section, Tailwind, Text } from "@react-email/components";

export default function ProductEmail({ link } : { link: string }){
    return(
        <Html>
            <Head />
            <Preview>
                Here is your product...!
            </Preview>
            <Tailwind>
                <Body className="bg-white font-sans">
                    <Container style={container}>
                        <Text className="text-2xl font-semibold">
                            Hi Friend,
                        </Text>
                        <Text className="text-lg text-gray-600">Thank you for buying your product at FrankUi</Text>

                        <Section className="w-full flex justify-center">
                            <Button href={link} className="text-white bg-blue-500 rounded-lg px-10 mt-7 py-4">
                                Your Download Link
                            </Button>
                        </Section>

                        <Text className="text-lg">
                            Best,
                            <br />
                            FrankUi Team
                        </Text>
                    </Container>                    
                </Body>
            </Tailwind>
        </Html>
    )
}

const container = {
    margin: "0 auto",
    padding: "20px 0 48px",
}