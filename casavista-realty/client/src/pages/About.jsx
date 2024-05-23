import React from 'react';
import { motion } from 'framer-motion';
import agent1 from '../public/agent1.jpg';
import agent2 from '../public/agent2.jpg';

export default function About() {
  return (
    <div className='relative min-h-screen flex items-center justify-center bg-gray-800 text-white'>
      <img
        src="https://source.unsplash.com/1600x900/?house,real-estate"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-50 blur-sm"
      />
      <div className='relative z-10 p-6 max-w-6xl w-full bg-gray-900 bg-opacity-90 rounded-lg shadow-lg'>
        <h1 className='text-4xl font-extrabold mb-8 text-center'>About CasaVista Realty</h1>
        <div className='bg-gradient-to-r from-orange-500 to-orange-700 p-8 rounded-lg'>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className='mb-8 text-lg leading-relaxed'
          >
            We are an experienced group of real estate professionals who have diligently served our wide range of clients with diligence and utmost professionalism. We are renowned for providing smart property solutions which are ahead of our time and beneficial for our clients in the longer run. Our cost-effective and time-saving services ease the nagging fears related to investment in the property sector. The large catalog of both residential and commercial properties we offer enables our clients to feel in control of their real estate destiny. So it's of little concern if there is a residential spot you eye in shape of a plot or a house or if you seek a commercial spot that can propel your business in the right direction because we are sure to have a deal tailored to mirror your needs and benefit. Our mode of working involves doing a thorough market analysis and then working out a suitable outcome for the client. Whether it's a longstanding issue of selling your property for the right price or getting professional help in finding an ideal house which rests near all the basic facilities of life for an affordable price. We offer multiple ways on how to properly spend your investment so that it may yield long-lasting benefits. We deal in all kinds of sale, purchase, rent, and commercial properties.
          </motion.p>
        </div>

        {/* Best Agents Section */}
        <div className='mt-10'>
          <h2 className='text-2xl font-bold mb-4 text-center'>Our Best Agents</h2>
          <div className='flex flex-col items-center gap-8'>
            <div className='flex flex-col items-center'>
              <div className="bg-gray-700 p-8 rounded-lg mb-4 flex flex-col items-center">
                <motion.img 
                  src={agent1} 
                  alt='Fakhar Amjad' 
                  className='w-40 h-40 mb-4 object-cover border-2 border-white rounded-full' 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
                <p className='text-xl font-semibold text-white text-center mb-2'>Fakhar Amjad</p>
                <motion.p 
                  className='text-lg text-white px-4 text-center' 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  Fakhar Amjad is an accomplished real estate professional with a wealth of experience in the industry. Known for his dedication and expertise, Fakhar has successfully guided numerous clients through their real estate journeys, whether they're buying, selling, or investing. With a keen eye for detail and a deep understanding of market trends, Fakhar ensures that his clients make informed decisions that align with their goals. His commitment to excellence and unparalleled service has earned him a reputation as one of the top agents in the region.
                </motion.p>
              </div>
            </div>
            <div className='flex flex-col items-center'>
              <div className="bg-gray-700 p-8 rounded-lg mb-4 flex flex-col items-center">
                <motion.img 
                  src={agent2} 
                  alt='Aasia Khalid' 
                  className='w-40 h-40 mb-4 object-cover border-2 border-white rounded-full' 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
                <p className='text-xl font-semibold text-white text-center mb-2'>Aasia Khalid</p>
                <motion.p 
                  className='text-lg text-white px-4 text-center' 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  Aasia Khalid is a dynamic and proactive real estate agent known for her exceptional client service and strategic approach to property transactions. With a background in finance and a passion for real estate, Aasia brings a unique perspective to the table, helping clients navigate the complexities of the market with ease. Whether it's finding the perfect home for a family or negotiating the best deal for an investment property, Aasia goes above and beyond to ensure her clients' needs are met. Her professionalism, integrity, and tireless work ethic make her a trusted advisor in the real estate community.
                </motion.p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
