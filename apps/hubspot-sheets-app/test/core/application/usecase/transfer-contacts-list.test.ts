import { TransferContactsListUseCaseImpl } from '@core/application/usecase/transfer-contacts-list.usecase'
import { type Contact } from '@core/domain/entity/contact'
import { type ContactStorageService } from '@core/domain/port/contact-storage-service'
import { InMemoryContactService } from '@infra/adapter/service/in-memory/in-memory-contact.service'
import { mockContact } from 'test/core/domain/mocks/mock-contacts'
import { describe, expect, test } from 'vitest'

interface SutTypes {
  transferContactsListUseCase: TransferContactsListUseCaseImpl
  toContactStorageService: ContactStorageService
  fromContactStorageService: ContactStorageService
}

const makeSut = (): SutTypes => {
  const toContactStorageService: ContactStorageService = new InMemoryContactService()
  const fromContactStorageService: ContactStorageService = new InMemoryContactService()
  const transferContactsListUseCase = new TransferContactsListUseCaseImpl(toContactStorageService, fromContactStorageService)
  return { transferContactsListUseCase, toContactStorageService, fromContactStorageService }
}

describe('TransferContactsListUseCaseImpl', () => {
  test('should return true', async () => {
    const { transferContactsListUseCase } = makeSut()
    const result = await transferContactsListUseCase.execute({})
    expect(result).toEqual(true)
  })

  test('should be transferred', async () => {
    const { transferContactsListUseCase, toContactStorageService, fromContactStorageService } = makeSut()
    const mockContacts: Contact[] = []
    expect([]).toEqual(await toContactStorageService.getContacts())
    expect([]).toEqual(await fromContactStorageService.getContacts())
    Array.from({ length: 10 }).forEach(() => mockContacts.push(mockContact()))
    await fromContactStorageService.saveContacts(mockContacts)
    const result = await transferContactsListUseCase.execute({})
    expect(result).toEqual(true)
    const toContacts = await toContactStorageService.getContacts()
    expect(mockContacts).toEqual(toContacts)
  })
})
