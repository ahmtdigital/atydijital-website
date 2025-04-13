
import { useState } from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    content: "Ignite Marketing transformed our online presence. Their SEO strategy increased our organic traffic by 320% within just six months.",
    author: "Sarah Johnson",
    title: "CEO, TechStart Inc.",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg"
  },
  {
    id: 2,
    content: "The team at Ignite delivers exceptional results. Our social media engagement has skyrocketed since we started working with them.",
    author: "Michael Chen",
    title: "Marketing Director, Fusion Foods",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg"
  },
  {
    id: 3,
    content: "Working with Ignite Marketing has been a game-changer for our brand. Their creative approach and data-driven strategies have helped us exceed our business goals.",
    author: "Emma Rodriguez",
    title: "Founder, Eco Lifestyle",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg"
  }
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-20 bg-dark-600 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-ignite/5 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-ignite/5 blur-3xl rounded-full"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-ignite font-semibold mb-3 reveal">TESTIMONIALS</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 reveal">What Our Clients Say</h2>
          <p className="text-gray-400 reveal">
            Don't just take our word for it. Hear from our satisfied clients about their experience working with us.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto reveal">
          <div className="relative bg-dark-500 rounded-2xl p-8 md:p-12 shadow-lg border border-dark-400">
            <Quote className="text-ignite/20 absolute top-8 left-8 h-24 w-24" />
            
            <div className="relative z-10">
              <p className="text-xl md:text-2xl leading-relaxed text-gray-200 mb-8">
                "{testimonials[activeIndex].content}"
              </p>
              
              <div className="flex items-center">
                <img 
                  src={testimonials[activeIndex].avatar} 
                  alt={testimonials[activeIndex].author}
                  className="w-14 h-14 rounded-full object-cover border-2 border-ignite mr-4"
                />
                <div>
                  <h4 className="font-bold text-white">{testimonials[activeIndex].author}</h4>
                  <p className="text-gray-400">{testimonials[activeIndex].title}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex ? 'bg-ignite w-6' : 'bg-gray-600'
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
