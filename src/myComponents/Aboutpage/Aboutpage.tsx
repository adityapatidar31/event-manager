import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AboutPage = () => {
  return (
    <div className="container mx-auto p-6 max-w-3xl">
      <Card className="shadow-lg rounded-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            About EventManager
          </CardTitle>
        </CardHeader>
        <CardContent>
          <img
            src="/about/aboutpage.jpg"
            alt="About EventManager"
            className="w-full h-60 object-cover rounded-lg mb-4"
          />
          <p className="text-lg text-gray-700 mb-4">
            EventManager is a comprehensive platform designed to streamline
            event planning, organization, and participation. Whether you're
            hosting a corporate event, a community gathering, or a personal
            celebration, EventManager makes it easy to manage and engage
            attendees.
          </p>
          <p className="text-md text-gray-600">
            Our mission is to provide an intuitive and feature-rich solution
            that empowers event organizers and enhances the attendee experience.
            Join us to create, manage, and attend events effortlessly.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutPage;
