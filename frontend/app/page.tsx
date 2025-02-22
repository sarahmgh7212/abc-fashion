import Link from "next/link";
export default function Home() {
	return (
		<div className="flex flex-col min-h-screen bg-gray-100">
			{/* ✅ Navbar */}
			<nav className="w-full bg-white shadow-md py-4 px-6 fixed top-0 left-0 z-50">
				<div className="container mx-auto flex justify-between items-center">
					<h1 className="text-2xl font-bold text-blue-600">
						📦 Abc Fashion Logistics Dashboard
					</h1>
					<ul className="flex gap-6">
						<li>
							<Link
								href="/shipments"
								className="text-lg text-gray-700 hover:text-blue-600 transition"
							>
								View Shipments
							</Link>
						</li>
						<li>
							<Link
								href="/customers"
								className="text-lg text-gray-700 hover:text-blue-600 transition"
							>
								View Customers
							</Link>
						</li>
					</ul>
				</div>
			</nav>

			{/* Hero Section */}
			<div className="flex flex-col items-center justify-center flex-grow text-center p-10 pt-24">
				<h2 className="text-4xl font-bold text-gray-800 mb-4">
					Welcome to Your Logistics Dashboard
				</h2>
				<p className="text-lg text-gray-600 max-w-xl">
					Manage shipments and customers efficiently with real-time updates.
				</p>

				<div className="mt-8 flex gap-6">
					<Link
						href="/shipments"
						className="px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-blue-700 transition"
					>
						📦 View Shipments
					</Link>
					<Link
						href="/customers"
						className="px-6 py-3 bg-green-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-green-700 transition"
					>
						👥 View Customers
					</Link>
				</div>
			</div>

			<footer className="w-full bg-white shadow-md text-center py-4">
				<p className="text-gray-500">
					© {new Date().getFullYear()} Abc Fashion website. Designed by Pipelabs
					team. All Rights Reserved.
				</p>
			</footer>
		</div>
	);
}
