import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { useToast } from "@/components/ui/hooks/use-toast";

interface LogoutProps {
	className?: string;
	onLogout?: () => void;
}

export const Logout = ({ className, onLogout }: LogoutProps) => {
	const navigate = useNavigate();
	const { toast } = useToast();

	const handleLogout = () => {
		// Clear token
		localStorage.removeItem("token");

		// Optional callback (e.g. close menu)
		if (onLogout) onLogout();

		toast({
			title: "Logged out",
			description: "See you soon!",
		});

		// Redirect
		navigate("/login");
	};

	return (
		<div
			onClick={handleLogout}
			className={`flex items-center cursor-pointer w-full ${className}`}
		>
			<LogOut className="mr-2 h-4 w-4" />
			<span>Log out</span>
		</div>
	);
};
