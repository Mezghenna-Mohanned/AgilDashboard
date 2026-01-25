import { CheckCircle, DollarSign, Users, Shield, Zap, Globe } from 'lucide-react'
import Header from '../components/Header'

export default function Pricing() {
  const plans = [
    {
      name: 'Basic',
      price: 'Free',
      description: 'For individual professionals',
      features: [
        'Access to public events',
        'Basic event registration',
        'Email notifications',
        'Up to 3 bookings per month'
      ],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Professional',
      price: '$29',
      period: '/month',
      description: 'For active professionals',
      features: [
        'Unlimited event bookings',
        'Priority registration',
        'Advanced networking tools',
        'Event recommendations',
        'Calendar integration',
        'Export capabilities'
      ],
      popular: true,
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For organizations',
      features: [
        'Everything in Professional',
        'Dedicated account manager',
        'Custom event creation',
        'Team management',
        'Advanced analytics',
        'API access',
        'SLA guarantee'
      ],
      color: 'from-orange-500 to-red-500'
    },
  ]

  return (
    <div className="min-h-screen bg-slate-900">
      <Header 
        title="Pricing Plans"
        subtitle="Choose the plan that fits your professional needs"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {plans.map((plan, index) => (
          <div 
            key={index} 
            className={`metric-card relative ${plan.popular ? 'border-2 border-purple-500/50' : ''}`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="px-4 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full">
                  MOST POPULAR
                </span>
              </div>
            )}
            
            <div className="text-center mb-6">
              <h3 className="text-white font-bold text-xl mb-2">{plan.name}</h3>
              <div className="flex items-baseline justify-center mb-2">
                <span className="text-4xl font-bold text-white">{plan.price}</span>
                {plan.period && <span className="text-slate-400 ml-2">{plan.period}</span>}
              </div>
              <p className="text-slate-400 text-sm">{plan.description}</p>
            </div>

            <div className="space-y-3 mb-6">
              {plan.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <button className={`w-full py-3 rounded-lg font-semibold transition-all ${
              plan.popular 
                ? 'btn-primary' 
                : 'bg-slate-800/50 border border-slate-700/50 text-white hover:bg-slate-700/50'
            }`}>
              {plan.price === 'Free' ? 'Get Started' : plan.price === 'Custom' ? 'Contact Sales' : 'Choose Plan'}
            </button>
          </div>
        ))}
      </div>

      <div className="metric-card">
        <h3 className="text-white font-bold text-xl mb-4 text-center">All plans include</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mx-auto mb-3">
              <Shield className="w-6 h-6 text-blue-400" />
            </div>
            <h4 className="text-white font-semibold mb-1">Security</h4>
            <p className="text-slate-400 text-sm">Enterprise-grade protection</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mx-auto mb-3">
              <Zap className="w-6 h-6 text-green-400" />
            </div>
            <h4 className="text-white font-semibold mb-1">Performance</h4>
            <p className="text-slate-400 text-sm">99.9% uptime guarantee</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-purple-400" />
            </div>
            <h4 className="text-white font-semibold mb-1">Support</h4>
            <p className="text-slate-400 text-sm">24/7 customer support</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center mx-auto mb-3">
              <Globe className="w-6 h-6 text-orange-400" />
            </div>
            <h4 className="text-white font-semibold mb-1">Global</h4>
            <p className="text-slate-400 text-sm">Worldwide coverage</p>
          </div>
        </div>
      </div>
    </div>
  )
}