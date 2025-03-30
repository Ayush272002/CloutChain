"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Brain,
  ChevronRight,
  LineChart,
  Lock,
  Sparkles,
  TrendingUp,
  Zap,
  Users,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import HeroChart from "@/components/HeroChart";
import TestimonialCard from "@/components/TestimonialCard";
import FeatureCard from "@/components/FeatureCard";

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#0f172a] to-black text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-black/40 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-cyan-400 flex items-center justify-center">
                <span className="text-white font-bold">Z</span>
              </div>
              <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400">
                ZoraTrade AI
              </span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                <Link
                  href="#features"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Features
                </Link>
                <Link
                  href="#testimonials"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Testimonials
                </Link>
                <Link
                  href="#pricing"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Pricing
                </Link>
                <Link
                  href="#dashboard"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </Link>
              </div>
            </div>
            <div className="flex items-center text-center">
              <Button
                variant="outline"
                size="sm"
                className="mr-2 border-purple-500 text-purple-400 hover:bg-slate-200 cursor-pointer"
              >
                Sign In
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 cursor-pointer"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 md:pt-20 lg:pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block mb-4">
                <span className="bg-purple-900/30 text-purple-400 text-xs font-medium px-2.5 py-1 rounded-md flex items-center">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Powered by AI
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
                <span className="block">Trade Smarter with</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400">
                  AI-Powered Insights
                </span>
              </h1>
              <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-lg">
                ZoraTrade AI combines advanced machine learning with real-time
                market data to give you the edge in cryptocurrency trading.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 cursor-pointer"
                >
                  Start Trading Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-gray-700 text-black hover:bg-slate-200 cursor-pointer"
                >
                  Watch Demo
                </Button>
              </div>
              <div className="mt-8 flex items-center text-sm text-gray-400">
                <Lock className="h-4 w-4 mr-2 text-gray-500" />
                No credit card required • Free 14-day trial
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-xl blur-xl"></div>
              <div className="relative bg-gray-900/80 border border-gray-800 rounded-xl overflow-hidden shadow-xl">
                <HeroChart />
              </div>
              <div className="absolute -bottom-4 -right-4 h-24 w-24 bg-gradient-to-r from-purple-600/20 to-cyan-500/20 rounded-full blur-xl"></div>
            </motion.div>
          </div>
        </div>

        {/* Background elements */}
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                label: "Active Traders",
                value: "12,000+",
                icon: <Users className="h-5 w-5 text-purple-400" />,
              },
              {
                label: "Successful Trades",
                value: "$240M+",
                icon: <LineChart className="h-5 w-5 text-cyan-400" />,
              },
              {
                label: "AI Accuracy",
                value: "94.2%",
                icon: <Brain className="h-5 w-5 text-emerald-400" />,
              },
              {
                label: "Markets Covered",
                value: "50+",
                icon: <Globe className="h-5 w-5 text-amber-400" />,
              },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-gray-800/30 border border-gray-700 rounded-lg p-6 text-center"
              >
                <div className="flex justify-center mb-2">{stat.icon}</div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Advanced Trading Features
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our platform combines cutting-edge AI with powerful trading tools
              to give you the edge in cryptocurrency markets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Brain />}
              title="AI Market Predictions"
              description="Our advanced AI analyzes market patterns and predicts potential price movements with high accuracy."
              delay={0.1}
            />
            <FeatureCard
              icon={<LineChart />}
              title="Real-time Analytics"
              description="Get instant insights with our real-time data analysis and visualization tools."
              delay={0.2}
            />
            <FeatureCard
              icon={<Zap />}
              title="Automated Trading"
              description="Set up AI-powered trading strategies that execute automatically based on market conditions."
              delay={0.3}
            />
            <FeatureCard
              icon={<TrendingUp />}
              title="Performance Tracking"
              description="Monitor your trading performance with detailed analytics and historical data."
              delay={0.4}
            />
            <FeatureCard
              icon={<Lock />}
              title="Bank-level Security"
              description="Your assets are protected with enterprise-grade security and encryption protocols."
              delay={0.5}
            />
            <FeatureCard
              icon={<Sparkles />}
              title="Custom Alerts"
              description="Set up personalized alerts for price movements, pattern formations, and AI signals."
              delay={0.6}
            />
          </div>
        </div>

        {/* Background elements */}
        <div className="absolute top-1/3 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 md:py-24 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by Traders Worldwide
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              See what our community of traders has to say about ZoraTrade AI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="ZoraTrade's AI predictions have completely transformed my trading strategy. I've seen a 32% increase in my portfolio in just 3 months."
              author="Alex Chen"
              role="Crypto Trader"
              delay={0.1}
            />
            <TestimonialCard
              quote="The real-time analytics and AI insights give me confidence in my trading decisions. This platform is a game-changer for serious traders."
              author="Sarah Johnson"
              role="Day Trader"
              delay={0.2}
            />
            <TestimonialCard
              quote="I was skeptical about AI trading tools, but ZoraTrade has proven its worth. The accuracy of the predictions is impressive."
              author="Michael Rodriguez"
              role="Investment Analyst"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-purple-900/20 to-cyan-900/20 border border-gray-800 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Trade with the Power of AI?
              </h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of traders who are already leveraging our
                AI-powered platform to make smarter trading decisions.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-700 hover:to-cyan-600 cursor-pointer"
                >
                  Get Started Free
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-gray-700 text-black hover:bg-slate-200 cursor-pointer"
                >
                  View Dashboard Demo
                </Button>
              </div>
              <p className="mt-4 text-sm text-gray-400">
                No credit card required • Free 14-day trial • Cancel anytime
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-cyan-400 flex items-center justify-center">
                  <span className="text-white font-bold">Z</span>
                </div>
                <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400">
                  ZoraTrade AI
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                Advanced AI-powered trading platform for cryptocurrency markets.
              </p>
            </div>

            <div>
              <h3 className="text-white font-medium mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    API
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-medium mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-medium mb-4">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Security
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 ZoraTrade AI. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">GitHub</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Discord</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M18.93 5.34a16.89 16.89 0 00-4.07-1.23c-.03 0-.05.01-.07.03-.17.3-.37.7-.5 1.01a15.72 15.72 0 00-4.57 0c-.14-.32-.34-.7-.5-1.01-.02-.02-.04-.03-.07-.03a16.89 16.89 0 00-4.07 1.23c-.01 0-.03.01-.04.02-2.59 3.8-3.3 7.5-2.95 11.16 0 .02.01.04.03.05a16.94 16.94 0 005.02 2.48c.02.01.05 0 .07-.02.39-.52.73-1.07 1.03-1.65.02-.03 0-.07-.04-.08-.54-.2-1.06-.44-1.56-.72-.04-.02-.04-.08-.01-.11.1-.08.21-.16.31-.24.02-.01.04-.01.06 0 3.04 1.36 6.34 1.36 9.34 0 .02-.01.04-.01.06 0 .1.08.21.16.31.24.04.03.03.09-.01.11-.5.28-1.02.52-1.56.72-.04.01-.05.05-.04.08.3.58.65 1.13 1.03 1.65.02.02.05.03.07.02a16.94 16.94 0 005.02-2.48c.02-.01.03-.03.03-.05.42-4.27-.7-7.93-2.96-11.16 0-.01-.02-.02-.04-.02zM8.56 14.49c-.99 0-1.8-.9-1.8-2 0-1.11.8-2 1.8-2 1.01 0 1.82.9 1.82 2 0 1.11-.8 2-1.82 2zm6.7 0c-.99 0-1.8-.9-1.8-2 0-1.11.8-2 1.8-2 1.01 0 1.82.9 1.82 2 0 1.11-.81 2-1.82 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
