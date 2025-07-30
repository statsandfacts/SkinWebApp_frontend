
"use client";
import { setLoginModal } from "@/redux/slices/digitalPrescription/auth.slice";
import { RootState } from "@/redux/store";
import { Button } from "@heroui/button"

import {Card, CardHeader, CardBody, CardFooter} from "@heroui/card";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoginDrawer from "../Auth/LoginDrawer";
import { setSymptomHistoryVisible } from "@/redux/slices/symptomBot.slice";
import SymptomHistoryDrawer from "@/components/SymptomBot/SymptomHistoryDrawer";
import { Sparkles , MapPinIcon,PhoneIcon,BookOpenIcon,HeartIcon,ClockIcon,CheckCircleIcon,MessageSquareText,Mail,Cpu ,X  } from 'lucide-react';

const SymptomBotDtls = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { userId } = useSelector((state: RootState) => state.auth);
  const [dpuserid, setDpuserid] = useState<string | null>("");
  const [showDemoModal, setShowDemoModal] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem("dpUserId");
    setDpuserid(storedUserId ? JSON.parse(storedUserId) : "");
  }, []);

  const { isModalOpen } = useSelector((state: any) => state.loginModal);

  const trySymptomBotHandleClick = () => {
    console.log("User ID : ", dpuserid);
    if (dpuserid) {
      router.push("/test-bot");
    } else {
      dispatch(setLoginModal(true));
    }
  };

  const features = [
    {
      icon: MessageSquareText ,
      title: "Conversational Interface",
      description: "Natural, intuitive chat experience that feels like talking to a healthcare professional",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/20"
    },
    {
      icon: Cpu ,
      title: "Smart Symptom Checker",
      description: "AI-powered analysis that understands complex symptom patterns and relationships",
      color: "from-emerald-500 to-green-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/20"
    },
    {
      icon: BookOpenIcon,
      title: "Guided, User-Friendly Flow",
      description: "Step-by-step guidance that makes health assessment simple and stress-free",
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50 dark:bg-amber-950/20"
    },
    {
      icon: Sparkles ,
      title: "AI-Powered, Personalized Responses",
      description: "Tailored recommendations based on your unique health profile and symptoms",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50 dark:bg-purple-950/20"
    }
  ];

  const benefits = [
    "24/7 Availability",
    "Instant Symptom Analysis",
    "Privacy Protected",
    "Evidence-Based Insights",
    "Multi-Language Support",
    "Seamless Integration"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-teal-600/10 animate-pulse"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-8">
            {/* Badge */}
            <div className="flex justify-center">
             
                <Sparkles  className="w-4 h-4 mr-2"/>
                 Next-Gen Health Assistant
             
            </div>

            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-600 bg-clip-text text-transparent leading-tight">
                Interactive Symptoms Bot
              </h1>
              <p className="text-2xl md:text-3xl text-slate-600 dark:text-slate-400 font-medium">
                Smarter Conversations. Better Health.
              </p>
            </div>

            {/* Description */}
            <div className="max-w-3xl mx-auto">
              <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed">
                Meet your soon-to-launch digital health assistant — an intelligent, conversational bot 
                designed to understand your symptoms and guide you toward better health decisions with 
                unprecedented accuracy and empathy.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button
                onClick={trySymptomBotHandleClick}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <HeartIcon className="w-5 h-5 mr-2" />
                Try Now - Free Beta
              </Button>
              <Button
                onClick={() => dispatch(setSymptomHistoryVisible(true))}
                variant="solid"
                size="lg"
                className="px-8 py-4 text-lg font-semibold rounded-xl border-2 border-slate-300 hover:border-slate-400 transition-all duration-300"
              >
                <ClockIcon className="w-5 h-5 mr-2" />
                Check Your History
              </Button>
            </div>

            {/* Launch Status */}
            <div className="flex justify-center items-center pt-4">
              <div className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full shadow-lg animate-pulse">
                <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                <span className="font-semibold">🛠 In Progress – Launching Soon!</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-200 mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Experience healthcare technology that understands you better
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className={`${feature.bgColor} border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group`}>
                <CardBody className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className={`p-4 rounded-xl bg-gradient-to-r ${feature.color} shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-200 mb-4">
              Why Choose Our Symptoms Bot?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Built with cutting-edge AI to serve you better
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0" />
                <span className="font-medium text-slate-800 dark:text-slate-200">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 shadow-2xl">
          <CardBody className="p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Experience the Future of Healthcare?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              We are building something powerful — a smart, empathetic health companion 
              that is always ready to talk. The future of self-assessment is just around the corner!
            </p>
            <Button
              onClick={() => setShowDemoModal(true)}
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              Request Live Demo
            </Button>
          </CardBody>
        </Card>
      </div>

      {/* Enhanced Demo Modal */}
      {showDemoModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in duration-300">
            <CardBody className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Live Demo Request
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 mt-2">
                    Get personalized access to our Interactive Symptoms Bot
                  </p>
                </div>
                <Button
                  onClick={() => setShowDemoModal(false)}
                  variant="ghost"
                  size="sm"
                  className="rounded-full"
                >
                  <X  className="w-5 h-5" />
                </Button>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 p-6 rounded-xl mb-6">
                <p className="text-slate-700 dark:text-slate-300 text-center">
                  🚀 Thank you for your interest in our Interactive Symptoms Bot! 
                  For a personalized <span className="font-semibold">live demo</span>, 
                  please contact our team directly.
                </p>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                  Get In Touch
                </h3>
                
                <div className="grid gap-4">
                  <a 
                    href="tel:+919124416966" 
                    className="flex items-center space-x-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    <div className="p-2 bg-blue-600 rounded-lg">
                      <PhoneIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">Call Us</p>
                      <p className="text-slate-600 dark:text-slate-400">+91 91244 16966</p>
                    </div>
                  </a>

                  <a 
                    href="mailto:support@nextcare.life" 
                    className="flex items-center space-x-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                  >
                    <div className="p-2 bg-green-600 rounded-lg">
                      <Mail  className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">Email Us</p>
                      <p className="text-slate-600 dark:text-slate-400">support@nextcare.life</p>
                    </div>
                  </a>

                  <div className="flex items-start space-x-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                    <div className="p-2 bg-purple-600 rounded-lg">
                      <MapPinIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">Visit Us</p>
                      <p className="text-slate-600 dark:text-slate-400">
                        KIIT-TBI, Campus 11, KIIT University, Patia, Bhubaneswar, Odisha 751024
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      )}

      <LoginDrawer />
      <SymptomHistoryDrawer drawerFor={"history"} />
    </div>
  );
};

export default SymptomBotDtls;