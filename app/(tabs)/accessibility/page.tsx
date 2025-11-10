'use client';

import { useAccessibility } from '@/lib/accessibility-context';
import {
    Type, Contrast, Zap, AlignLeft, Baseline, Link, Focus, Eye,
    RotateCcw, Check, ArrowLeft, Smartphone, Globe, Keyboard,
    Users, Heart, Volume2, Image, Mic, BookOpen
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function AccessibilityPage() {
    const router = useRouter();
    const { settings, updateSetting, resetSettings } = useAccessibility();
    const [showResetConfirm, setShowResetConfirm] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState('English');
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsLanguageDropdownOpen(false);
            }
        };

        if (isLanguageDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isLanguageDropdownOpen]);

    const languageOptions = [
        { value: 'English', label: 'English', flag: '🇬🇧' },
        { value: 'Urdu', label: 'اردو (Urdu)', flag: '🇵🇰' },
        { value: 'Pashto', label: 'پښتو (Pashto)', flag: '🇦🇫' },
        { value: 'Sindhi', label: 'سنڌي (Sindhi)', flag: '🇵🇰' },
    ];

    const fontSizeOptions = [
        { value: 'small' as const, label: 'Small', size: 'text-xs', description: '14px' },
        { value: 'medium' as const, label: 'Medium', size: 'text-sm', description: '16px' },
        { value: 'large' as const, label: 'Large', size: 'text-base', description: '18px' },
        { value: 'extra-large' as const, label: 'Extra Large', size: 'text-lg', description: '20px' },
    ];

    const colorBlindOptions = [
        {
            value: 'none' as const,
            label: 'Standard',
            description: 'Default color scheme',
            icon: Eye
        },
        {
            value: 'protanopia' as const,
            label: 'Protanopia',
            description: 'Red color deficiency',
            icon: Eye
        },
        {
            value: 'deuteranopia' as const,
            label: 'Deuteranopia',
            description: 'Green color deficiency',
            icon: Eye
        },
        {
            value: 'tritanopia' as const,
            label: 'Tritanopia',
            description: 'Blue color deficiency',
            icon: Eye
        },
    ];

    // Seniors Section Settings
    const seniorsSettings = [
        {
            key: 'largeTextMode' as const,
            icon: Type,
            label: 'Large Text Mode',
            description: 'Increase font size throughout the app for better readability.',
            color: 'bg-blue-100 text-blue-600',
        },
        {
            key: 'simplifiedNavigation' as const,
            icon: Zap,
            label: 'Simplified Navigation',
            description: 'Switch to a simplified layout with fewer options and larger buttons.',
            color: 'bg-green-100 text-green-600',
        },
        {
            key: 'voiceControl' as const,
            icon: Mic,
            label: 'Voice Control Options',
            description: 'Enable and customize voice commands for common actions like ordering.',
            color: 'bg-purple-100 text-purple-600',
        },
        {
            key: 'highContrast' as const,
            icon: Contrast,
            label: 'High Contrast Mode',
            description: 'Enhance color contrast for improved visibility.',
            color: 'bg-amber-100 text-amber-600',
        },
    ];

    // Disability Section Settings
    const disabilitySettings = [
        {
            key: 'screenReaderOptimization' as const,
            icon: Volume2,
            label: 'Screen Reader Optimization',
            description: 'Enable advanced screen reader support with proper labels.',
            color: 'bg-rose-100 text-rose-600',
        },
        {
            key: 'assistiveTouch' as const,
            icon: Focus,
            label: 'Assistive Touch/Gesture',
            description: 'Remap or customize touch gestures for motor impairments.',
            color: 'bg-indigo-100 text-indigo-600',
        },
        {
            key: 'colorBlindMode' as const,
            icon: Eye,
            label: 'Color Blind Mode',
            description: 'Adjust the color scheme for various forms of color blindness.',
            color: 'bg-teal-100 text-teal-600',
        },
        {
            key: 'reducedMotion' as const,
            icon: Zap,
            label: 'Reduced Motion UI',
            description: 'Disable animations and transitions for motion sensitivity.',
            color: 'bg-cyan-100 text-cyan-600',
        },
    ];

    // Illiterate Section Settings
    const illiterateSettings = [
        {
            key: 'iconOnlyMode' as const,
            icon: Image,
            label: 'Icon-Only Mode',
            description: 'Display information primarily through universally recognized icons.',
            color: 'bg-violet-100 text-violet-600',
        },
        {
            key: 'audioAssistance' as const,
            icon: Volume2,
            label: 'Audio Assistance',
            description: 'Enable audio descriptions for screen elements and instructions.',
            color: 'bg-pink-100 text-pink-600',
        },
        {
            key: 'pictorialMenu' as const,
            icon: BookOpen,
            label: 'Pictorial Menu View',
            description: 'Display restaurant menus with larger, clearer images of dishes.',
            color: 'bg-orange-100 text-orange-600',
        },
        {
            key: 'voiceInput' as const,
            icon: Mic,
            label: 'Voice Input for Search',
            description: 'Enhanced voice-based interaction for search and common actions.',
            color: 'bg-lime-100 text-lime-600',
        },
    ];

    const toggleSettings = [
        {
            key: 'textSpacing' as const,
            icon: AlignLeft,
            label: 'Enhanced Text Spacing',
            description: 'Increase spacing between lines, words, and paragraphs',
            category: 'Reading',
        },
        {
            key: 'readableFont' as const,
            icon: Baseline,
            label: 'Dyslexia-Friendly Font',
            description: 'Use a more readable font designed for people with dyslexia',
            category: 'Reading',
        },
        {
            key: 'linkHighlight' as const,
            icon: Link,
            label: 'Link Underlines',
            description: 'Underline all clickable links for better identification',
            category: 'Navigation',
        },
        {
            key: 'focusIndicator' as const,
            icon: Focus,
            label: 'Enhanced Focus',
            description: 'Show prominent focus indicators for keyboard navigation',
            category: 'Navigation',
        },
    ];

    const accessibilityTips = [
        {
            icon: Keyboard,
            title: 'Keyboard Navigation',
            description: 'Use Tab to navigate, Enter to select, and Escape to close dialogs',
        },
        {
            icon: Smartphone,
            title: 'Screen Reader Support',
            description: 'This app is optimized for screen readers like VoiceOver and TalkBack',
        },
        {
            icon: Globe,
            title: 'WCAG Compliant',
            description: 'We follow Web Content Accessibility Guidelines 2.1 Level AA',
        },
    ];

    return (
        <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
                <div className="max-w-4xl mx-auto px-4 py-4">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => router.back()}
                            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
                            aria-label="Go back"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-700" />
                        </button>
                        <div className="flex items-center gap-3 flex-1">
                            <div className="w-12 h-12 bg-linear-to-br from-[#FF6B00] to-[#FF8534] rounded-2xl flex items-center justify-center shadow-lg">
                                <Eye className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Accessibility</h1>
                                <p className="text-sm text-gray-500">Customize your experience</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 pb-24">
                {/* Introduction */}
                <div className="bg-linear-to-br from-[#FF6B00]/10 to-[#FF8534]/5 rounded-2xl p-6 border border-[#FF6B00]/20">
                    <h2 className="text-lg font-semibold text-gray-900 mb-2">Welcome to Accessibility Settings</h2>
                    <p className="text-sm text-gray-600">
                        Personalize your experience with features designed to make our app more accessible and comfortable to use.
                        All settings are saved automatically and will persist across sessions.
                    </p>
                </div>

                {/* Language Section */}
                <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-linear-to-br from-[#FF6B00] to-[#FF8534] rounded-2xl flex items-center justify-center shadow-lg">
                            <Globe className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900">Language</h3>
                            <p className="text-sm text-gray-500">Choose your preferred language</p>
                        </div>
                    </div>
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                            className="w-full p-4 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all bg-white text-left flex items-center justify-between"
                            aria-label="Select language"
                            aria-expanded={isLanguageDropdownOpen}
                        >
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">
                                    {languageOptions.find(lang => lang.value === selectedLanguage)?.flag}
                                </span>
                                <div>
                                    <p className="text-sm text-gray-500 mb-0.5">Selected Language</p>
                                    <p className="font-semibold text-gray-900">
                                        {languageOptions.find(lang => lang.value === selectedLanguage)?.label}
                                    </p>
                                </div>
                            </div>
                            <svg
                                className={`w-5 h-5 text-gray-400 transition-transform ${isLanguageDropdownOpen ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {isLanguageDropdownOpen && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-in">
                                {languageOptions.map((language) => (
                                    <button
                                        key={language.value}
                                        onClick={() => {
                                            setSelectedLanguage(language.value);
                                            setIsLanguageDropdownOpen(false);
                                        }}
                                        className={`w-full p-4 text-left flex items-center gap-3 hover:bg-gray-50 transition-colors ${selectedLanguage === language.value ? 'bg-[#FF6B00]/5' : ''
                                            }`}
                                    >
                                        <span className="text-2xl">{language.flag}</span>
                                        <span className="flex-1 font-medium text-gray-900">{language.label}</span>
                                        {selectedLanguage === language.value && (
                                            <div className="w-6 h-6 bg-[#FF6B00] rounded-full flex items-center justify-center">
                                                <Check className="w-4 h-4 text-white" />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl">
                        <p className="text-xs text-blue-800">
                            ℹ️ Language settings will be available in a future update. Currently for UI demonstration purposes.
                        </p>
                    </div>
                </section>

                {/* Seniors Section */}
                <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <Users className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900">Seniors</h3>
                            <p className="text-sm text-gray-500">Features designed for older adults</p>
                        </div>
                    </div>
                    <div className="grid gap-4">
                        {seniorsSettings.map((setting) => {
                            const Icon = setting.icon;
                            const isEnabled = settings[setting.key];
                            return (
                                <div
                                    key={setting.key}
                                    className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-100 hover:border-gray-200 transition-all bg-linear-to-r from-white to-gray-50/50"
                                >
                                    <div className="flex items-center gap-4 flex-1">
                                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${setting.color}`}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-gray-900 mb-0.5">{setting.label}</h4>
                                            <p className="text-sm text-gray-600">{setting.description}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => updateSetting(setting.key, !isEnabled)}
                                        className={`relative w-14 h-8 rounded-full transition-colors duration-200 ease-in-out shrink-0 ml-4 ${isEnabled ? 'bg-[#FF6B00]' : 'bg-gray-300'
                                            }`}
                                        aria-label={`Toggle ${setting.label}`}
                                        aria-checked={isEnabled ? 'true' : 'false'}
                                        role="switch"
                                    >
                                        <div
                                            className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform duration-200 ease-in-out shadow-md ${isEnabled ? 'translate-x-7 left-0.5' : 'translate-x-0 left-0.5'
                                                }`}
                                        />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Disability Section */}
                <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-linear-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <Heart className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900">Disability</h3>
                            <p className="text-sm text-gray-500">Accessibility features for diverse needs</p>
                        </div>
                    </div>
                    <div className="grid gap-4">
                        {disabilitySettings.map((setting) => {
                            const Icon = setting.icon;
                            const isEnabled = settings[setting.key];
                            return (
                                <div
                                    key={setting.key}
                                    className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-100 hover:border-gray-200 transition-all bg-linear-to-r from-white to-gray-50/50"
                                >
                                    <div className="flex items-center gap-4 flex-1">
                                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${setting.color}`}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-gray-900 mb-0.5">{setting.label}</h4>
                                            <p className="text-sm text-gray-600">{setting.description}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => updateSetting(setting.key, !isEnabled)}
                                        className={`relative w-14 h-8 rounded-full transition-colors duration-200 ease-in-out shrink-0 ml-4 ${isEnabled ? 'bg-[#FF6B00]' : 'bg-gray-300'
                                            }`}
                                        aria-label={`Toggle ${setting.label}`}
                                        aria-checked={isEnabled ? 'true' : 'false'}
                                        role="switch"
                                    >
                                        <div
                                            className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform duration-200 ease-in-out shadow-md ${isEnabled ? 'translate-x-7 left-0.5' : 'translate-x-0 left-0.5'
                                                }`}
                                        />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Illiterate Section */}
                <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-linear-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900">Illiterate</h3>
                            <p className="text-sm text-gray-500">Visual and audio assistance features</p>
                        </div>
                    </div>
                    <div className="grid gap-4">
                        {illiterateSettings.map((setting) => {
                            const Icon = setting.icon;
                            const isEnabled = settings[setting.key];
                            return (
                                <div
                                    key={setting.key}
                                    className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-100 hover:border-gray-200 transition-all bg-linear-to-r from-white to-gray-50/50"
                                >
                                    <div className="flex items-center gap-4 flex-1">
                                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${setting.color}`}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-semibold text-gray-900 mb-0.5">{setting.label}</h4>
                                            <p className="text-sm text-gray-600">{setting.description}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => updateSetting(setting.key, !isEnabled)}
                                        className={`relative w-14 h-8 rounded-full transition-colors duration-200 ease-in-out shrink-0 ml-4 ${isEnabled ? 'bg-[#FF6B00]' : 'bg-gray-300'
                                            }`}
                                        aria-label={`Toggle ${setting.label}`}
                                        aria-checked={isEnabled ? 'true' : 'false'}
                                        role="switch"
                                    >
                                        <div
                                            className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform duration-200 ease-in-out shadow-md ${isEnabled ? 'translate-x-7 left-0.5' : 'translate-x-0 left-0.5'
                                                }`}
                                        />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Font Size Section */}
                <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                            <Type className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Text Size</h3>
                            <p className="text-sm text-gray-500">Adjust the base font size for better readability</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {fontSizeOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => updateSetting('fontSize', option.value)}
                                className={`p-5 rounded-xl border-2 transition-all ${settings.fontSize === option.value
                                    ? 'border-[#FF6B00] bg-[#FF6B00]/5 shadow-md scale-[1.02]'
                                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                    }`}
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-semibold text-gray-900">{option.label}</span>
                                    {settings.fontSize === option.value && (
                                        <div className="w-6 h-6 bg-[#FF6B00] rounded-full flex items-center justify-center">
                                            <Check className="w-4 h-4 text-white" />
                                        </div>
                                    )}
                                </div>
                                <div className={`${option.size} text-gray-600 mb-1`}>Sample Text</div>
                                <div className="text-xs text-gray-400">{option.description}</div>
                            </button>
                        ))}
                    </div>
                </section>

                {/* Visual Adjustments */}
                <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">Visual & Reading Adjustments</h3>
                        <p className="text-sm text-gray-500">Customize how content is displayed</p>
                    </div>
                    <div className="space-y-3">
                        {toggleSettings.map((setting) => {
                            const Icon = setting.icon;
                            const isEnabled = settings[setting.key];
                            return (
                                <button
                                    key={setting.key}
                                    onClick={() => updateSetting(setting.key, !isEnabled)}
                                    className={`w-full p-5 rounded-xl border-2 transition-all text-left ${isEnabled
                                        ? 'border-[#FF6B00] bg-[#FF6B00]/5 shadow-sm'
                                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                        }`}
                                >
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-start gap-4 flex-1">
                                            <div
                                                className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${isEnabled ? 'bg-[#FF6B00] shadow-lg' : 'bg-gray-100'
                                                    }`}
                                            >
                                                <Icon
                                                    className={`w-6 h-6 ${isEnabled ? 'text-white' : 'text-gray-600'
                                                        }`}
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h4 className="font-semibold text-gray-900">{setting.label}</h4>
                                                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-medium">
                                                        {setting.category}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-600">{setting.description}</p>
                                            </div>
                                        </div>
                                        <div
                                            className={`relative w-14 h-7 rounded-full transition-colors shrink-0 ${isEnabled ? 'bg-[#FF6B00]' : 'bg-gray-300'
                                                }`}
                                        >
                                            <div
                                                className={`absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full transition-transform shadow-md ${isEnabled ? 'translate-x-7' : 'translate-x-0'
                                                    }`}
                                            />
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </section>

                {/* Color Vision Section */}
                <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                            <Eye className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">Color Vision Adjustments</h3>
                            <p className="text-sm text-gray-500">Optimize colors for different types of color vision</p>
                        </div>
                    </div>
                    <div className="grid gap-3">
                        {colorBlindOptions.map((option) => {
                            const Icon = option.icon;
                            return (
                                <button
                                    key={option.value}
                                    onClick={() => updateSetting('colorBlindMode', option.value)}
                                    className={`w-full p-5 rounded-xl border-2 transition-all text-left ${settings.colorBlindMode === option.value
                                        ? 'border-[#FF6B00] bg-[#FF6B00]/5 shadow-md'
                                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                        }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${settings.colorBlindMode === option.value ? 'bg-[#FF6B00]' : 'bg-gray-100'
                                                }`}>
                                                <Icon className={`w-6 h-6 ${settings.colorBlindMode === option.value ? 'text-white' : 'text-gray-600'
                                                    }`} />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900 mb-0.5">{option.label}</h4>
                                                <p className="text-sm text-gray-500">{option.description}</p>
                                            </div>
                                        </div>
                                        {settings.colorBlindMode === option.value && (
                                            <div className="w-7 h-7 bg-[#FF6B00] rounded-full flex items-center justify-center">
                                                <Check className="w-5 h-5 text-white" />
                                            </div>
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </section>

                {/* Accessibility Tips */}
                <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Accessibility Features</h3>
                    <div className="space-y-3">
                        {accessibilityTips.map((tip, index) => {
                            const Icon = tip.icon;
                            return (
                                <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-gray-200 shrink-0">
                                        <Icon className="w-5 h-5 text-gray-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-1">{tip.title}</h4>
                                        <p className="text-sm text-gray-600">{tip.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Reset Section */}
                <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Reset Settings</h3>
                    {showResetConfirm ? (
                        <div className="space-y-4">
                            <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl">
                                <p className="text-sm text-amber-800 font-medium">
                                    ⚠️ This will reset all accessibility settings to their default values. This action cannot be undone.
                                </p>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowResetConfirm(false)}
                                    className="flex-1 py-3 px-4 rounded-xl border-2 border-gray-300 font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        resetSettings();
                                        setShowResetConfirm(false);
                                    }}
                                    className="flex-1 py-3 px-4 rounded-xl bg-red-500 font-semibold text-white hover:bg-red-600 transition-colors shadow-sm"
                                >
                                    Reset All
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={() => setShowResetConfirm(true)}
                            className="w-full py-3 px-4 rounded-xl border-2 border-gray-200 font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors flex items-center justify-center gap-2"
                        >
                            <RotateCcw className="w-5 h-5" />
                            Reset All Settings to Default
                        </button>
                    )}
                </section>
            </div>
        </div>
    );
}
