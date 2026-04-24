import { X } from "lucide-react";

interface Props {
    formName: string;
    setFormName: (val: string) => void;
    formEmail: string;
    setFormEmail: (val: string) => void;
    onSubmit: () => void;
    onClose: () => void;
    sending: boolean;
}

export default function AuthModal({
                                      formName,
                                      setFormName,
                                      formEmail,
                                      setFormEmail,
                                      onSubmit,
                                      onClose,
                                      sending,
                                  }: Props) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/30" onClick={onClose} />
            <div className="relative bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                >
                    <X className="w-5 h-5" />
                </button>

                <h3 className="text-2xl font-serif font-bold text-center mb-1">
                    Send Comment
                </h3>
                <p className="text-primary-6 text-sm text-center mb-6">
                    Please fill the form below
                </p>

                <div className="flex flex-col gap-4">
                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Full Name{" "}
                            <span className="text-primary-6">(required)</span>
                        </label>
                        <input
                            type="text"
                            value={formName}
                            onChange={(e) => setFormName(e.target.value)}
                            placeholder="enter your full name"
                            className="mt-1 w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary-6 transition"
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Email{" "}
                            <span className="text-primary-6">(required)</span>
                        </label>
                        <input
                            type="email"
                            value={formEmail}
                            onChange={(e) => setFormEmail(e.target.value)}
                            placeholder="enter your email"
                            className="mt-1 w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary-6 transition"
                        />
                    </div>

                    <button
                        onClick={onSubmit}
                        disabled={!formName.trim() || !formEmail.trim() || sending}
                        className="w-full bg-primary-6 text-white py-3 rounded-xl text-sm font-medium hover:bg-primary-6/90 transition disabled:opacity-50"
                    >
                        {sending ? "Sending..." : "Sent"}
                    </button>
                </div>
            </div>
        </div>
    );
}