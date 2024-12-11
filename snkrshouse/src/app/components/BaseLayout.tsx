'use client';
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
} from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import useOpenModal from '../contexts/Dialog';

const navigation = [
	{ name: 'Loja', href: '/', current: true },
	// { name: "Team", href: "#", current: false },
];

function classNames(...classes: (string | undefined | null | false)[]): string {
	return classes.filter(Boolean).join(' ');
}

const BaseLayout = () => {
	const { changeOpen } = useOpenModal();
	return (
		<Disclosure as='nav' className='bg-gray-800'>
			<div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
				<div className='relative flex h-16 items-center justify-between'>
					<div className='absolute inset-y-0 left-0 flex items-center sm:hidden'>
						<DisclosureButton className='group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
							<span className='absolute -inset-0.5' />
							<span className='sr-only'>Open main menu</span>
							<Bars3Icon
								aria-hidden='true'
								className='block size-6 group-data-[open]:hidden'
							/>
							<XMarkIcon
								aria-hidden='true'
								className='hidden size-6 group-data-[open]:block'
							/>
						</DisclosureButton>
					</div>
					<div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
						<div className='hidden sm:ml-6 sm:block'>
							<div className='flex space-x-4'>
								{navigation.map((item) => (
									<a
										key={item.name}
										href={item.href}
										aria-current={item.current ? 'page' : undefined}
										className={classNames(
											item.current
												? 'bg-gray-900 text-white'
												: 'text-gray-300 hover:bg-gray-700 hover:text-white',
											'rounded-md px-3 py-2 text-sm font-medium'
										)}>
										{item.name}
									</a>
								))}
								<div className='ml-auto'>
									<button
										onClick={changeOpen}
										className='inline-flex items-center justify-center rounded-md bg-indigo-600 text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 px-4 py-2 text-sm font-semibold transition duration-150 ease-in-out'>
										Adicionar Produto
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<DisclosurePanel className='sm:hidden'>
				<div className='space-y-1 px-2 pb-3 pt-2'>
					{navigation.map((item) => (
						<DisclosureButton
							key={item.name}
							as='a'
							href={item.href}
							aria-current={item.current ? 'page' : undefined}
							className={classNames(
								item.current
									? 'bg-gray-900 text-white'
									: 'text-gray-300 hover:bg-gray-700 hover:text-white',
								'block rounded-md px-3 py-2 text-base font-medium'
							)}>
							{item.name}
						</DisclosureButton>
					))}
				</div>
			</DisclosurePanel>
		</Disclosure>
	);
};

export default BaseLayout;
